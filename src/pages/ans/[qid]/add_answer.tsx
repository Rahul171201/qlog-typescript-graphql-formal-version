import styles from './Answer.module.css';
import Navbar from '@/components/Navbar/Navbar';
import lato from '@/data/latoFont';
import useLocalStorage from '@/hooks/useLocalStorage';
import ImageComponent from '@/components/ImageComponent/ImageComponent';
import AnswerForm from '@/components/AnswerForm/AnswerForm';
import QuestionType from '@/types/QuestionType';
import { useQuery } from '@apollo/client';
import getQuestionQuery from '@/queries/getQuestionQuery';
import LoadingPage from '@/components/LoadingPage/LoadingPage';

const AddAnswer = ({ qId }: { qId: number }) => {
  // questions context

   const { data, loading, error } = useQuery(getQuestionQuery, {
    variables: {
      id: qId
    },
  });



  if(loading){
    return <LoadingPage></LoadingPage>
  }

  if(error){
    throw new Error(error.message);
  }

  // current Question
  const question = data.question;

  return (
    <div className={`${styles.answerWrapper} ${lato.className}`}>
      <Navbar></Navbar>
      <div className={styles.questionWrapper}>
        <div className={styles.questionTitle}>{question.title}</div>
        <hr className={styles.horizontalRule}></hr>
        <div className={styles.questionDescription}>
          {question.description}
          {question.attachments.map((attachment: string, index: number) => {
            return (
              <ImageComponent key={index} src={attachment}></ImageComponent>
            );
          })}
        </div>
        <div className={styles.infoBar}>
          <span>{question.ownerName}</span>
        </div>
        <AnswerForm question={question}></AnswerForm>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }: { params: any }) {
  return {
    props: {
      qId: +params.qid
    }
  };
}

export default AddAnswer;
