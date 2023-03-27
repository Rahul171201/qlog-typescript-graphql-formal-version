import styles from "./StatsColumn.module.css";
import StatsCard from "./StatsCard/StatsCard";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import BlankCard from "./BlankCard/BlankCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useQuery, useReactiveVar } from "@apollo/client";
import { user } from "@/reactive-var/user";
import getQuestionsQuery from "@/queries/getQuestionsQuery";
import getUserDetailsQuery from "@/queries/getUserDetailsQuery";
import FetchLoader from "../FetchLoader/FetchLoader";
import QuestionType from "@/types/QuestionType";
import AnswerType from "@/types/AnswerType";
import { find } from "lodash";

const StatsColumn = ({type} : {type: "questionColumn" | "answerColumn"}) => {

  const currentUser = useReactiveVar(user);

  const {data, loading, error} = useQuery(getUserDetailsQuery, {
    variables: {
      id: currentUser?.userId
    }
  });

  if(loading){
    return <FetchLoader></FetchLoader>
  }

  if(error){
    throw new Error(error.message);
  }

  return (
    <div className={styles.columnWrapper}>
      {data.user && type === "questionColumn" ? (
        data.user.asked.length === 0 ? (
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
        )
      ) : data.user.answered.length === 0 ? (
        <BlankCard
          title="No questions answered yet!"
          content="Start your day by answering a question!"
        ></BlankCard>
      ) : (
        data.user.answered.map((a : AnswerType) => {
          const q_title = 'This is just a random question for now to conpensate for the poor Design pattern created by me! Sorry for the inconvinience :(';
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

export default StatsColumn;
