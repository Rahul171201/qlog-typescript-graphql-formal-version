import { SyntheticEvent } from 'react';
import AnswerType from './AnswerType';
import QuestionType from './QuestionType';
import UserType from './UserType';

type ActionStateType = {
  type?: string;
  event?: SyntheticEvent;
  fields?: HTMLCollectionOf<HTMLElement> | HTMLElement[] | JSX.Element[];
  payload?: UserType | QuestionType| AnswerType| UserType[] | QuestionType[] | AnswerType[];
  result?: UserType | UserType[] | null
};

export default ActionStateType;
