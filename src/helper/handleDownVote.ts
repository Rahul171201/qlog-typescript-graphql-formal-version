import AnswerType from '@/types/AnswerType';
import UserType from '@/types/UserType';
import { user } from '@/reactive-var/user';

const handleDownvote = (currentUser: UserType, answer: AnswerType, updateAnswer: Function) => {
  // if user or answer is not defined return
  if (!currentUser) {
    throw new Error('Invalid Authentication: User is not defined');
  }

  let currentUpvotes = answer.upvotes;
  let currentDownvotes = answer.downvotes;
  const temp_upvoted = [...currentUser.hasUpvoted];
  const temp_downvoted = [...currentUser.hasDownvoted];

  // if current user has already upvoted
  if (currentUser.hasUpvoted.includes(answer.id)) {
    currentDownvotes++;
    currentUpvotes--;
    const index = temp_upvoted.indexOf(answer.id);
    if (index > -1) temp_upvoted.splice(index, 1);
    temp_downvoted.push(answer.id);
  }

  // if current user has already downvoted
  else if (currentUser.hasDownvoted.includes(answer.id)) {
    currentDownvotes--;
    const index = temp_downvoted.indexOf(answer.id);
    if (index > -1) temp_downvoted.splice(index, 1);
  }

  // if current user has neither upvoted nor downvoted
  else {
    currentDownvotes++;
    temp_downvoted.push(answer.id);
  }

  user({
    ...currentUser,
    hasUpvoted: temp_upvoted,
    hasDownvoted: temp_downvoted
  });

  updateAnswer({
    variables: {
      id: answer.id,
      upvotes: currentUpvotes,
      downvotes: currentDownvotes,
      currentUserId: currentUser.userId
    }
  });

};

export default handleDownvote;
