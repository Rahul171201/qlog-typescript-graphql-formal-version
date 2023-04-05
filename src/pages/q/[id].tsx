import Navbar from '@/components/Navbar/Navbar';
import styles from './Question.module.css';
import Image from 'next/image';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import lato from '@/data/latoFont';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { SearchContext } from '@/contexts/SearchContext';
import Router from 'next/router';
import sortAnswerArray from '@/helper/sortAnswerArray';
import ImageComponent from '@/components/ImageComponent/ImageComponent';
import handleRating from '@/helper/handleRating';
import AnswerType from '@/types/AnswerType';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import getQuestionQuery from '@/queries/getQuestionQuery';
import updateQuestionMutation from '@/mutations/updateQuestionMutation';
import { user } from '@/reactive-var/user';
import LoadingPage from '@/components/LoadingPage/LoadingPage';
import { find } from 'lodash';
import UserType from '@/types/UserType';
import ThemeType from '@/types/ThemeType';
import { theme } from '@/reactive-var/theme';
import { Button } from '@mui/material';

const Question = ({ qId }: { qId: number }) => {
  // currently Logged in User
  const currentUser: UserType | null = useReactiveVar(user);

  //current theme
  const currentTheme = useReactiveVar(theme);

  // search context
  const { setSearchText } = useContext(SearchContext);

  const { data, loading, error, refetch } = useQuery(getQuestionQuery, {
    variables: {
      id: qId
    }
  });

  const [updateQuestion, {}] = useMutation(updateQuestionMutation);

  // current question
  const question = data ? data.question : null;

  const [answerGiven, setAnswerGiven] = useState<boolean>(false);
  const [questionAsked, setQuestionAsked] = useState<boolean>(false);

  // state for className for rating icon component
  const [className, setClassName] = useState<string>('starIcon');

  useEffect(() => {
    refetch();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('currentuser', JSON.stringify(currentUser));
    }
    if (currentUser && currentUser.answered && question) {
      const userAnswered = currentUser.answered as AnswerType[];
      userAnswered.forEach((ans: AnswerType) => {
        const answer_given = find(question.answers, { id: ans.id });
        if (answer_given) {
          setAnswerGiven(true);
        }
      });
      if (question.owner.userId === currentUser.userId) {
        setQuestionAsked(true);
      }
    }
  }, [currentUser, question, refetch]);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  if (error) {
    return `Error: ${error.message}`;
  }

  const answerArray: AnswerType[] = [];
  question.answers.forEach((answer: AnswerType) => {
    answerArray.push(answer);
  });
  const ans: AnswerType[] = sortAnswerArray(answerArray);

  const handleTagSubmit = (e: SyntheticEvent) => {
    const textContent = e.currentTarget.textContent;
    if (textContent) {
      const tagData = textContent.substr(1, textContent.length);
      if (setSearchText) {
        setSearchText(tagData);
        Router.push('/feed');
      } else {
        throw new Error(
          'Invocation failed: setSearchText is either null | undefined'
        );
      }
    } else {
      throw new Error('Undefined text content in TagDivElement');
    }
  };

  return (
    <main className={styles.main}>
      <Navbar></Navbar>
      <div data-theme={currentTheme} className={`${styles.contentWrapper} ${lato.className}`}>
        <div
          className={styles.content}
        >
          <div data-theme={currentTheme} className={styles.questionBox}>
            <div data-theme={currentTheme} className={styles.questionWrapper}>
              <div className={styles.questionTitle}>{question.title}</div>
              <div id="description" className={styles.questionDescription}>
                {question.description}
                {question.attachments.map(
                  (attachment: string, index: number) => {
                    return (
                      <ImageComponent
                        src={attachment}
                        key={index}
                      ></ImageComponent>
                    );
                  }
                )}
              </div>
              <div className={styles.tagBox}>
                {question.tags.map((tag: string, idx: number) => {
                  return (
                    <div
                      onClick={handleTagSubmit}
                      className={styles.tag}
                      key={idx}
                    >
                      #{tag}
                    </div>
                  );
                })}
              </div>
              <div className={styles.bottomBar}>
                {answerGiven || questionAsked ? (
                  <></>
                ) : (
                  <div className={styles.answerButtonWrapper}>
                    <Link
                      href={'/ans/' + question.id + '/add_answer'}
                      className={styles.answerButton}
                    >
                      <Button variant="contained" sx={currentTheme==="dark" ? {backgroundColor: "white", color: "black", '&:hover': {backgroundColor: "#FFFBF5"}} : {}}>Add answer</Button>
                    </Link>
                  </div>
                )}
              </div>
              <div data-theme={currentTheme} className={styles.ownerName}>
                Asked by <span>{question.owner.userName}</span>
              </div>
            </div>

            <div className={styles.questionSideBox}>
              <div
                className={styles.ratingWrapper}
                onClick={() => {
                  if (currentUser) {
                    if (className === 'starIcon')
                      setClassName('rotateStarIcon');
                    else setClassName('starIcon');
                    handleRating(currentUser, question, updateQuestion);
                  } else {
                    throw new Error(
                      'Unauthorized access : User is not defined'
                    );
                  }
                }}
              >
                <div className={styles.iconWrapper}>
                  <Image
                    src="/images/star.png"
                    alt="rating-icon"
                    width={50}
                    height={50}
                    className={className}
                    id="icon"
                  ></Image>
                </div>
                <div className={styles.tempWrapper}>
                  <span className={styles.rating}>{question.rating}</span>
                </div>
              </div>
              <div data-theme={currentTheme} className={styles.infoWrapper}>
                <span>1 day ago</span>
              </div>
            </div>
          </div>

          <div className={styles.answersBox}>
            {ans.map((a, idx) => {
              return <AnswerCard key={idx} answer={a} id={a.id}></AnswerCard>;
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps({ params }: { params: any }) {
  return {
    props: {
      qId: Number(params.id)
    }
  };
}

export default Question;
