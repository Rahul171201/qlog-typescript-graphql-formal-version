import styles from './QuestionCard.module.css';
import lato from '@/data/latoFont';
import ContinueReading from './ContinueReading/ContinueReading';
import QuestionHeader from './QuestionHeader/QuestionHeader';
import QuestionDescription from './QuestionDescription/QuestionDescription';
import { useState } from 'react';
import QuestionType from '@/types/QuestionType';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';
import { Button } from '@mui/material';
import Router from 'next/router';
import { darkButtonStyles, lightButtonStyles } from '@/data/buttonStyles';

// Question card component
const QuestionCard = ({ q }: { q: QuestionType }) => {
  // current theme
  const currentTheme = useReactiveVar(theme);

  // state to determine if the question to be shown fully
  const [fullDisplay, setFullDisplay] = useState<boolean>(false);

  const handleRedirect = () => {
    Router.push('/ans/' + q.id + '/add_answer');
  };

  return (
    <div data-theme={currentTheme} className={styles.cardWrapper}>
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
          className={styles.continueReadingBox}
        >
          {fullDisplay ? <></> : <ContinueReading></ContinueReading>}
        </div>
        {fullDisplay ? (
          <div className={styles.buttonWrapper}>
            <Button
              onClick={handleRedirect}
              variant="contained"
              sx={currentTheme === 'dark' ? darkButtonStyles : lightButtonStyles}
            >
              Add Answer
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
