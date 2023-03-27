import UserType from "./UserType";

type QuestionType = {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  owner?: UserType;
  tags: string[];
  date: Date;
  rating: number;
  answers: number[];
  attachments: string[];
};

export default QuestionType;
