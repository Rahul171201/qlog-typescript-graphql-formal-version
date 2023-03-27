import AnswerType from "./AnswerType";
import QuestionType from "./QuestionType";

type UserType = {
  userId: number;
  userName: string;
  email?: string;
  password: string;
  profileImage?: string;
  asked: number[] | QuestionType[];
  answered: AnswerType[] |number[];
  hasRated: number[];
  hasUpvoted: number[];
  hasDownvoted: number[];
};

export default UserType;
