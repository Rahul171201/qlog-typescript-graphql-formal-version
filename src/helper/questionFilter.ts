import nonKeyWords from '@/data/nonKeyWords';
import QuestionType from '@/types/QuestionType';

/**
 * Filters the questions into an array of questions containing the
 * search text result matches
 * @param questions map of questions
 * @param search_words array of search strings
 * @returns filtered out questions based on search text
 */
const questionFilter = (
  questions: QuestionType[],
  search_words: string[] | null
): QuestionType[] => {
  if (!questions) return [];

  if (search_words === null) return Array.from(questions.values());

  // final array of questions
  const result: QuestionType[] = [];

  questions.forEach((question) => {
    let pushed = false; // to track if the question is already filtered out

    const titleArray = question.title.split(' ');
    const descriptionArray = question.description.split(' ');
    const tagsArray = question.tags;

    titleArray.forEach((item) => {
      if (search_words.includes(item) && !nonKeyWords.includes(item)) {
        result.push(question);
        pushed = true;
      }
    });

    if (!pushed) {
      descriptionArray.forEach((item) => {
        if (search_words.includes(item) && !nonKeyWords.includes(item)) {
          result.push(question);
          pushed = true;
        }
      });
    }

    if (!pushed) {
      tagsArray.forEach((item) => {
        if (search_words.includes(item) && !nonKeyWords.includes(item)) {
          result.push(question);
          pushed = true;
        }
      });
    }
  });
  return result;
};

export default questionFilter;
