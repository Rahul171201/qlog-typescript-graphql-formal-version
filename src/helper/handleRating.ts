import QuestionType from '@/types/QuestionType';
import UserType from '@/types/UserType';
import { user } from '@/reactive-var/user';

const handleRating = (
  currentUser: UserType | null,
  question: QuestionType,
  updateQuestion: Function
) => {
  let currentRating: number = question.rating;

  if(!currentUser)
    throw new Error('User is not defined: Invalid authentication');

  if (currentUser.hasRated.includes(question.id)) {
    currentRating--;
    const temp_rated = [...currentUser.hasRated];
    const index = temp_rated.indexOf(question.id);
    if (index > -1) temp_rated.splice(index, 1);
    user({...currentUser, hasRated: temp_rated});
  } else {
    currentRating++;
    user({ ...currentUser, hasRated: [...currentUser.hasRated, question.id] });
  }
  updateQuestion({
    variables: {
      id: question.id,
      rating: currentRating,
      currentUserId: currentUser.userId
    },
  });
};

export default handleRating;
