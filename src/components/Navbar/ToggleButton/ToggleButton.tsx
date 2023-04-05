import { diamondPearlTheme, sunBurnTheme } from '@/data/themes';
import { theme } from '@/reactive-var/theme';
import { useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';
import styles from './ToggleButton.module.css';
import ThemeType from '@/types/ThemeType';

const ToggleButton = () => {
  // current theme
  const currentTheme = useReactiveVar(theme);

  const [className, setClassName] = useState('light');

  const toggleTheme = () => {
    if (className === 'light') {
      theme('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      theme('light');
      window.localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    setClassName(currentTheme as ThemeType);
  }, [setClassName, currentTheme]);

  return (
    <div className={styles.buttonWrapper}>
      <div
        className={
          className === 'light'
            ? `${styles.buttonSlider} ${styles.light}`
            : `${styles.buttonSlider} ${styles.dark}`
        }
      >
        <div
          className={
            className === 'light'
              ? `${styles.button} ${styles.light}`
              : `${styles.button} ${styles.dark}`
          }
          onClick={toggleTheme}
        >
          <img src={className === 'light' ? '/images/moon.png' : '/images/sun.png'} alt='theme-icon' className={styles.themeIcon}></img>
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
