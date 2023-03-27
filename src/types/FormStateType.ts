import { SyntheticEvent } from 'react';
import AnswerType from './AnswerType';
import QuestionType from './QuestionType';
import UserType from './UserType';

type FormStateType = {
  user?: UserType | null;
  users?: UserType[] | null;
  status?: string;
  type?: string;
  action?: Function;
  event?: SyntheticEvent;
  payload?: UserType | QuestionType| AnswerType| UserType[] | QuestionType[] | AnswerType[];
};

export default FormStateType;
