import QuestionType from '@/types/QuestionType';
import UserType from '@/types/UserType';

const handleQuestionSubmit = (
  questionTitle : string,
  questionDescription : string,
  questionTags: string[],
  questions: QuestionType[],
  user: UserType,
  attachments: string[]
): QuestionType => {
  
  const newQuestion = {
    id: questions.length,
    title: questionTitle,
    description: questionDescription,
    ownerName: user.userName,
    ownerId: user.userId,
    tags: questionTags,
    date: new Date(),
    rating: 0,
    answers: [],
    attachments: attachments,
  };

  return newQuestion;
};

export default handleQuestionSubmit;
