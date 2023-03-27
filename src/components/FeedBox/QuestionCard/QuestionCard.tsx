import styles from "./QuestionCard.module.css";
import lato from "@/data/latoFont";
import ContinueReading from "./ContinueReading/ContinueReading";
import QuestionHeader from "./QuestionHeader/QuestionHeader";
import QuestionDescription from "./QuestionDescription/QuestionDescription";
import { useState } from "react";
import QuestionType from "@/types/QuestionType";

// Question card component
const QuestionCard = ({q} : {q: QuestionType}) => {
  // state to determine if the question to be shown fully
  const [fullDisplay, setFullDisplay] = useState<boolean>(false);

  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.card} ${lato.className}`}>
        <QuestionHeader q={q}></QuestionHeader>
        <hr className={styles.horizontalRule}></hr>
        <QuestionDescription
          q={q}
          fullDisplay={fullDisplay}
        ></QuestionDescription>
        <div
          onClick={(e) => {
            setFullDisplay(true);
          }}
        >
          {fullDisplay ? <></> : <ContinueReading></ContinueReading>}
        </div>
      </div>
      {/* Decorative circles */}
      <div className={`${styles.circle} ${styles.bigCircle}`}></div>
      <div className={`${styles.circle} ${styles.mediumCircle}`}></div>
      <div className={`${styles.circle} ${styles.smallCircle}`}></div>
    </div>
  );
};

export default QuestionCard;
