import styles from './QuestionCard.module.css';
import lato from '@/data/latoFont';
import ContinueReading from './ContinueReading/ContinueReading';
import QuestionHeader from './QuestionHeader/QuestionHeader';
import QuestionDescription from './QuestionDescription/QuestionDescription';
import { useState } from 'react';
import QuestionType from '@/types/QuestionType';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';

// Question card component
const QuestionCard = ({ q }: { q: QuestionType }) => {
  // current theme
  const currentTheme = useReactiveVar(theme);

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

      {currentTheme.type === 'theme1' ? (
        <div>
          <div className={`${styles.diamondPearlCircle} ${styles.bigCircle}`}></div>
          <div className={`${styles.diamondPearlCircle} ${styles.mediumCircle}`}></div>
          <div className={`${styles.diamondPearlCircle} ${styles.smallCircle}`}></div>
        </div>
      ) : (
        <div>
          <div className={`${styles.sunBurnCircle} ${styles.bigCircle}`}></div>
          <div className={`${styles.sunBurnCircle} ${styles.mediumCircle}`}></div>
          <div className={`${styles.sunBurnCircle} ${styles.smallCircle}`}></div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
