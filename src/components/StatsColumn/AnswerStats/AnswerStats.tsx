import styles from './AnswerStats.module.css';
import { useQuery } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';
import { user } from '@/reactive-var/user';
import FetchLoader from '@/components/FetchLoader/FetchLoader';
import BlankCard from '../BlankCard/BlankCard';
import AnswerType from '@/types/AnswerType';
import StatsCard from '../StatsCard/StatsCard';
import getUserDetailsQuery from '@/queries/getUserDetailsQuery';

const AnswerStats = () => {
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

  console.log(data);

  return (
    <div>
      {data.user.answered.length === 0 ? (
        <BlankCard
          title="No questions answered yet!"
          content="Start your day by answering a question!"
        ></BlankCard>
      ) : (
        data.user.answered.map((a: AnswerType) => {
          const q_title = a.question?.title as string;
          return (
            <StatsCard
              key={a.qid}
              title={q_title}
              description={a.content}
              id={a.qid}
              attachments={a.attachments}
            ></StatsCard>
          );
        })
      )}
    </div>
  );
};

export default AnswerStats;
