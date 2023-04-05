import ImageComponent from '../ImageComponent/ImageComponent';
import styles from './QuestionForm.module.css';
import Router from 'next/router';
import handleQuestionSubmit from '@/helper/handleQuestionSubmit';
import lato from '@/data/latoFont';
import { Dispatch, SetStateAction, useState } from 'react';
import TagField from './TagField/TagField';
import QuestionType from '@/types/QuestionType';
import {
  useMutation,
  useQuery,
  useReactiveVar
} from '@apollo/client';
import { user } from '@/reactive-var/user';
import getQuestionsQuery from '@/queries/getQuestionsQuery';
import FetchLoader from '../FetchLoader/FetchLoader';
import postQuestionMutation from '@/mutations/postQuestionMutation';

const QuestionForm = () => {
  // currently Logged in user
  const currentUser = useReactiveVar(user);

  const { data, loading, error, client } = useQuery(getQuestionsQuery);

  const [postQuestion, {}] = useMutation(postQuestionMutation);

  const [attachments, setAttachments]: [
    string[],
    Dispatch<SetStateAction<string[]>>
  ] = useState<string[]>([]);

  const [tags, setTags]: [
    JSX.Element[],
    Dispatch<SetStateAction<JSX.Element[]>>
  ] = useState<JSX.Element[]>([]);

  const addTag = () => {
    setTags([...tags, <TagField key={tags.length}></TagField>]);
  };

  if (loading) return <FetchLoader></FetchLoader>;
  if (error) throw new Error(error.message);


  return (
    <div className={`${styles.formWrapper} ${lato.className}`}>
      <form
        className={styles.questionForm}
        onSubmit={async(e) => {
          e.preventDefault();
          if (currentUser) {
            const allInputs = e.currentTarget.getElementsByTagName('input');
            const tags = [];
            for (let i = 1; i < allInputs.length - 1; i++) {
              tags.push(allInputs[i].value);
            }
            const questionTitle =
              e.currentTarget.getElementsByTagName('input')[0].value;
            const questionDescription =
              e.currentTarget.getElementsByTagName('textarea')[0].value;
            const newQuestion: QuestionType = handleQuestionSubmit(
              questionTitle,
              questionDescription,
              tags,
              data.questions,
              currentUser,
              attachments
            );
            await postQuestion({
              variables: {
                title: newQuestion.title,
                description: newQuestion.description,
                ownerId: newQuestion.ownerId,
                tags: newQuestion.tags,
                attachments: newQuestion.attachments
              },
              update: (cache, {data}) => {
                cache.modify({
                  fields: {
                    questions: (existingFieldData: QuestionType[]) => {
                      return [...existingFieldData, data.postQuestion];
                    }
                  }
                });
              }
            });


            client.resetStore();

            Router.push('/feed');
          } else {
            throw new Error(
              'Unauthenticated service : Invalid user, user is not defined'
            );
          }
        }}
      >
        <div className={styles.titleWrapper}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            id="title"
            type="text"
            className={styles.titleInput}
            required
          ></input>
        </div>
        <div className={styles.descriptionWrapper}>
          <label htmlFor="descriptionArea" className={styles.label}>
            Description
          </label>
          <div className={styles.descriptionArea}>
            <textarea className={styles.descriptionInput}></textarea>
            {attachments.map((attachment, index) => {
              return (
                <ImageComponent key={index} src={attachment}></ImageComponent>
              );
            })}
          </div>
        </div>
        <div className={styles.tagsWrapper}>
          {tags.map((tag) => tag)}
          <button className={styles.addTagButton} onClick={addTag}>
            Add Tag
          </button>
        </div>
        <div className={styles.fileInputWrapper}>
          <label htmlFor="uploadImageButton" className={styles.fileInputButton}>
            Upload Image
          </label>
          <input
            onChange={(e) => {
              const uploadImageButton = e.target;
              let reader = new FileReader();
              if (uploadImageButton.files) {
                reader.readAsDataURL(uploadImageButton.files[0]);
                reader.onload = () => {
                  setAttachments([...attachments, reader.result] as string[]);
                };
              }
            }}
            type="file"
            className={styles.fileInput}
            id="uploadImageButton"
            accept="image/*"
          ></input>
        </div>
        <div className={styles.submitButtonWrapper}>
          <button className={styles.submitButton} type="submit">
            POST
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
