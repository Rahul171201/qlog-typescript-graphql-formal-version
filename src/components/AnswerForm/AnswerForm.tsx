import styles from './AnswerForm.module.css';
import ImageComponent from '../ImageComponent/ImageComponent';
import handleAnswerSubmit from '@/helper/handleAnswerSubmit';
import Router from 'next/router';
import {useRef, useState } from 'react';
import AnswerType from '@/types/AnswerType';
import QuestionType from '@/types/QuestionType';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { user } from '@/reactive-var/user';
import getAnswersQuery from '@/queries/getAnswersQuery';
import FetchLoader from '../FetchLoader/FetchLoader';
import postAnswerMutation from '@/mutations/postAnswerMutation';
import { Button } from '@mui/material';

const AnswerForm = ({ question }: { question: QuestionType }) => {
  // currently Logged in User
  const currentUser = useReactiveVar(user);

  const { data, loading, error } = useQuery(getAnswersQuery);

  const [postAnswer, {}] = useMutation(postAnswerMutation);

  // to store the answer content
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const answerArea = useRef(null);

  const handleClear = () => {
    setContent('');
  };

  if (loading) {
    return <FetchLoader></FetchLoader>;
  }

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className={styles.answerBox}>
      <div className={styles.topBar}>Type your answer below</div>
      <div className={styles.textArea}>
        <div id="answerArea" className={styles.answerArea} ref={answerArea}>
          <textarea
            className={styles.text}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
          {attachments ? (
            attachments.map((attachment, index) => {
              return (
                <ImageComponent key={index} src={attachment}></ImageComponent>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div onClick={handleClear}>
               <Button variant='contained' >Clear</Button>
        </div>
       
        <div className={styles.uploadButtonWrapper}>
          <label htmlFor="fileInput" className={styles.uploadButton}>
            UPLOAD IMAGE
          </label>
          <input
            onChange={(e) => {
              const uploadImageButton = e.target;
              let reader = new FileReader();
              if (uploadImageButton.files) {
                reader.readAsDataURL(uploadImageButton.files[0]);
              }
              reader.onload = async () => {
                setAttachments([...attachments, reader.result] as string[]);
              };
            }}
            type="file"
            accept="image/*"
            id="fileInput"
            className={styles.fileInput}
          ></input>
        </div>

        <Button variant='contained'
          onClick={() => {
            if (currentUser) {
              const new_answer = handleAnswerSubmit(
                data.answers,
                currentUser,
                question,
                content,
                attachments
              );
              postAnswer({
                variables: {
                  ownerId: new_answer.ownerId,
                  content: new_answer.content,
                  qid: new_answer.qid,
                  attachments: new_answer.attachments
                },
                update: (cache, { data }) => {
                  cache.modify({
                    fields: {
                      answers: (existingFieldData: AnswerType[]) => {
                        return [...existingFieldData, data.postAnswer];
                      }
                    }
                  });
                }
              });

              Router.push('/q/' + question.id);
            } else {
              throw new Error('Invalid authentication : user is not defined');
            }
          }}
        >
          POST
        </Button>
      </div>
    </div>
  );
};

export default AnswerForm;
