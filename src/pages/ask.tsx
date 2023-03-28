import styles from '../styles/Ask.module.css';
import Navbar from '@/components/Navbar/Navbar';
import { useContext, useEffect } from 'react';
import { SearchContext } from '@/contexts/SearchContext';
import QuestionForm from '@/components/QuestionForm/QuestionForm';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';

const Ask = () => {

  // current theme
  const currentTheme = useReactiveVar(theme);

  // search context
  const { setSearchText } = useContext(SearchContext);

  useEffect(() => {
    if (setSearchText) setSearchText(null);
  }, [setSearchText]);

  return (
    <div className={styles.askWrapper}  style={{backgroundImage: `url(${currentTheme.backgroundImage})`, backgroundColor: currentTheme.backgroundColor}}>
      <Navbar></Navbar>
      <QuestionForm></QuestionForm>
    </div>
  );
};

export default Ask;
