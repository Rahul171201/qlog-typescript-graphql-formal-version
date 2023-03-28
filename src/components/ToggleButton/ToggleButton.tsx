import { useState } from 'react';
import styles from './ToggleButton.module.css';

const ToggleButton = () => {
  const [className, setClassName] = useState('theme1');

  const toggleTheme = () => {
    if(className === 'theme1'){
        setClassName('theme2');
    }
    else{
        setClassName('theme1')
    }
  };

  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.themeTitle}>{
        className === 'theme1'? 'Diamond Pearl' : 'Sun Burn' 
      }</div>
      <div className={className === 'theme1' ?  `${styles.buttonSlider} ${styles.theme1}` : `${styles.buttonSlider} ${styles.theme2}`}>
        <div className={className === 'theme1' ?  `${styles.button} ${styles.theme1}` : `${styles.button} ${styles.theme2}`} onClick={toggleTheme}></div>
      </div>
    </div>
  );
};

export default ToggleButton;
