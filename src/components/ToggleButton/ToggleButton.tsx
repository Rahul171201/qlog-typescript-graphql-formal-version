import { diamondPearlTheme, sunBurnTheme } from '@/data/themes';
import { theme } from '@/reactive-var/theme';
import { useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';
import styles from './ToggleButton.module.css';

const ToggleButton = () => {
  // current theme
  const currentTheme = useReactiveVar(theme);

  const [className, setClassName] = useState('theme1');

  const toggleTheme = () => {
    if (className === 'theme1') {
      theme(sunBurnTheme);
      window.localStorage.setItem('theme', JSON.stringify(sunBurnTheme));
    } else {
      theme(diamondPearlTheme);
      window.localStorage.setItem('theme', JSON.stringify(diamondPearlTheme));
    }
    console.log(theme);
  };

  useEffect(() => {
    setClassName(currentTheme.type);
  }, [setClassName, currentTheme]);

  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.themeTitle}>
        {className === 'theme1' ? 'Diamond Pearl' : 'Sun Burn'}
      </div>
      <div
        className={
          className === 'theme1'
            ? `${styles.buttonSlider} ${styles.theme1}`
            : `${styles.buttonSlider} ${styles.theme2}`
        }
      >
        <div
          className={
            className === 'theme1'
              ? `${styles.button} ${styles.theme1}`
              : `${styles.button} ${styles.theme2}`
          }
          onClick={toggleTheme}
        ></div>
      </div>
    </div>
  );
};

export default ToggleButton;
