import AnswerType from '@/types/AnswerType';

/**
 * Sorts the array of questions according to number of upvotes and downvotes
 * @param ans array of answers
 * @returns sorted array of answers according to upvoted and downvotes
 */
const sortAnswerArray = (ans: AnswerType[]) => {
  let res = ans.sort((a, b) => {
    if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;
    return a.downvotes - b.downvotes;
  });
  return res;
};

export default sortAnswerArray;
