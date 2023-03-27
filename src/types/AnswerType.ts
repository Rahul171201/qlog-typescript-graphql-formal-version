import QuestionType from "./QuestionType";
import UserType from "./UserType";

type AnswerType = {
  id: number,
  ownerId: number,
  owner?: UserType,
  content: string;
  qid: number,
  question?: QuestionType,
  date: Date,
  upvotes: number,
  downvotes: number,
  attachments: string[]
};

export default AnswerType;
