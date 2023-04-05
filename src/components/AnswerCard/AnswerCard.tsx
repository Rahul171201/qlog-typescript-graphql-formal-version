import { memo } from 'react';
import ImageComponent from '../ImageComponent/ImageComponent';
import styles from './AnswerCard.module.css';
import handleUpvote from '@/helper/handleUpvote';
import handleDownvote from '@/helper/handleDownVote';
import AnswerType from '@/types/AnswerType';
import { useMutation, useReactiveVar } from '@apollo/client';
import { user } from '@/reactive-var/user';
import UserType from '@/types/UserType';
import updateAnswerMutation from '@/mutations/updateAnswerMutation';
import FetchLoader from '../FetchLoader/FetchLoader';
import { theme } from '@/reactive-var/theme';
// Answer Card component
const AnswerCard = ({ answer, id }: { answer: AnswerType; id: number }) => {

  const currentTheme = useReactiveVar(theme);

  //current Logged in User
  const currentUser: UserType | null = useReactiveVar(user);

  const [updateAnswer, { loading, error }] = useMutation(updateAnswerMutation);

  if (loading) {
    return <FetchLoader></FetchLoader>;
  }

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div data-theme={currentTheme} className={styles.answerWrapper}>
      <div className={styles.rightBox}>
        <div className={styles.header}>
          <div className={styles.votingBox}>
            <div
              onClick={() => {
                if (currentUser)
                  handleUpvote(currentUser, answer, updateAnswer);
              }}
            >
              <img
                src={currentTheme === "light" ? "/images/upvote.png" : "/images/upvote-white.png"}
                alt="upvote"
                className={styles.votingButton}
              ></img>
            </div>
            <div>{answer.upvotes - answer.downvotes}</div>
            <div
              onClick={() => {
                if (currentUser)
                  handleDownvote(currentUser, answer, updateAnswer);
              }}
            >
              <img
                src={currentTheme === "light" ? "/images/downvote.png" : "/images/downvote-white.png"}
                alt="downvote"
                className={styles.votingButton}
              ></img>
            </div>
          </div>
          <span>Answered by {answer.owner?.userName}</span>
          <span>2 days ago</span>
        </div>
        <hr className={styles.horizontalRule}></hr>
        <div className={styles.content} id={'content' + id}>
          {answer.content}
          {answer.attachments.map((attachment, index) => {
            return (
              <ImageComponent src={attachment} key={index}></ImageComponent>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(AnswerCard);
