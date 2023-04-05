import styles from './StatsColumn.module.css';
import StatsCard from './StatsCard/StatsCard';
import BlankCard from './BlankCard/BlankCard';
import { useQuery, useReactiveVar } from '@apollo/client';
import { user } from '@/reactive-var/user';
import getUserDetailsQuery from '@/queries/getUserDetailsQuery';
import FetchLoader from '../FetchLoader/FetchLoader';
import QuestionType from '@/types/QuestionType';
import AnswerType from '@/types/AnswerType';
import QuestionStats from './QuestionStats/QuestionStats';
import AnswerStats from './AnswerStats/AnswerStats';

const StatsColumn = ({ type }: { type: 'questionColumn' | 'answerColumn' }) => {
  const currentUser = useReactiveVar(user);

  const { data, loading, error } = useQuery(getUserDetailsQuery, {
    variables: {
      id: currentUser?.userId
    }
  });

  if (loading) {
    return <FetchLoader></FetchLoader>;
  }

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className={styles.columnWrapper}>
      {type === 'questionColumn' ? (
        <QuestionStats></QuestionStats>
      ) : (
        <AnswerStats></AnswerStats>
      )}
    </div>
  );
};

export default StatsColumn;
