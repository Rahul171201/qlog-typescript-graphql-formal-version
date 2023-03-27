import AnswerType from '@/types/AnswerType';
import QuestionType from '@/types/QuestionType';
import UserType from '@/types/UserType';

/**
 * Submits the answer by a authenticated user to a particular question
 * @param answers map of answers
 * @param user current logged in user
 * @param question current question
 * @param content answer content
 * @param attachments array of image or video attachments
 * @returns newly created answer
 */

const handleAnswerSubmit = (
  answers: AnswerType[],
  currentUser: UserType,
  question: QuestionType,
  content: string,
  attachments: string[]
) => {
  const id: number = answers.length;

  const new_answer: AnswerType = {
    id,
    ownerId: currentUser.userId,
    content,
    qid: question.id,
    date: new Date(),
    upvotes: 0,
    downvotes: 0,
    attachments: attachments
  };

  return new_answer;
};

export default handleAnswerSubmit;
