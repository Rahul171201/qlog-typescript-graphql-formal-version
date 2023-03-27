import { UserContext } from '@/contexts/UserContext';
import { memo, useContext } from 'react';
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
// Answer Card component
const AnswerCard = ({
  answer,
  id
}: {
  answer: AnswerType,
  id: number
}) => {
  //current Logged in User
  const currentUser : UserType | null = useReactiveVar(user);

  const [updateAnswer, {loading, error}] = useMutation(updateAnswerMutation);

  if(loading){
    return <FetchLoader></FetchLoader>
  }

  if(error){
    throw new Error(error.message);
  }


  return (
    <div className={styles.answerWrapper}>
      <div className={styles.leftBox}>
        <div
          className={styles.upVote}
          onClick={() => {
            if (currentUser) handleUpvote(currentUser, answer, updateAnswer);
          }}
        >
          <span className={styles.upvoteCount}>{answer.upvotes}</span>
        </div>
        <div
          className={styles.downVote}
          onClick={() => {
            if (currentUser) handleDownvote(currentUser, answer, updateAnswer);
          }}
        >
          <span className={styles.downvoteCount}>{answer.downvotes}</span>
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.header}>
          <span>{answer.owner?.userName}</span>
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
      <div className={styles.bookmarkDesign}></div>
    </div>
  );
};

export default memo(AnswerCard);
