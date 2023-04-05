import styles from './Profile.module.css';
import Navbar from '@/components/Navbar/Navbar';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import StatsColumn from '@/components/StatsColumn/StatsColumn';
import lato from '@/data/latoFont';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';
import { Button } from '@mui/material';
import { useState } from 'react';
import { darkButtonStyles, lightButtonStyles } from '@/data/buttonStyles';

const Profile = ({ userId }: { userId: number }) => {
  const currentTheme = useReactiveVar(theme);

  const [filter, setFilter] = useState<string>('questions');

  return (
    <div
      data-theme={currentTheme}
      className={`${styles.profileWrapper} ${lato.className}`}
    >
      <Navbar></Navbar>
      <div className={styles.mainbodyWrapper}>
        <ProfileCard></ProfileCard>
        <div className={styles.askQuestionButtonWrapper}>
          <Link href={'/ask'} className={styles.askQuestionButton}>
            <Button variant="contained" sx={currentTheme === "light"  ? lightButtonStyles : darkButtonStyles}>Ask a Question?</Button>
          </Link>
        </div>

        <div data-theme={currentTheme} className={styles.filterBarWrapper}>
          <div className={styles.filterBar}>
            <div
              className={
                filter === 'questions'
                  ? `${styles.filter} ${styles.highlighted}`
                  : `${styles.filter}`
              }
              onClick={() => setFilter('questions')}
            >
              Asked
            </div>
            <div
              className={
                filter === 'answers'
                  ? `${styles.filter} ${styles.highlighted}`
                  : `${styles.filter}`
              }
              onClick={() => setFilter('answers')}
            >
              Answered
            </div>
          </div>
          <hr data-theme={currentTheme} className={styles.filterRule}></hr>
        </div>
        <div className={styles.statsPanel}>
          {filter === 'questions' ? (
            <div className={styles.questionPanel}>
              <StatsColumn type="questionColumn"></StatsColumn>
            </div>
          ) : (
            <div className={styles.answerPanel}>
              <StatsColumn type="answerColumn"></StatsColumn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }: { params: any }) {
  return {
    props: {
      userId: params.id
    }
  };
}

export default Profile;
