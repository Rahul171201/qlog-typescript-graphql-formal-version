import styles from './QuestionStats.module.css';
import { useQuery } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';
import { user } from '@/reactive-var/user';
import FetchLoader from '@/components/FetchLoader/FetchLoader';
import BlankCard from '../BlankCard/BlankCard';
import QuestionType from '@/types/QuestionType';
import StatsCard from '../StatsCard/StatsCard';
import getUserDetailsQuery from '@/queries/getUserDetailsQuery';

const QuestionStats = () => {
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
    <div>
      {data.user.asked.length === 0 ? (
        <BlankCard
          title="No questions asked yet!"
          content="Curious? Start your day by asking a question!"
        ></BlankCard>
      ) : (
        data.user.asked.map((q: QuestionType) => {
          return (
            <StatsCard
              key={q.id}
              title={q.title}
              description={q.description}
              id={q.id}
              attachments={q.attachments}
            ></StatsCard>
          );
        })
      )}
    </div>
  );
};

export default QuestionStats;
