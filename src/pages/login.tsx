import styles from '../styles/Login.module.css';
import Logo from '@/components/Logo/Logo';
import SloganComponent from '@/components/SloganComponent/SloganComponent';
import { useContext, useEffect } from 'react';
import loginFormData from '@/data/loginFormData';
import { SearchContext } from '@/contexts/SearchContext';
import Form from '@/components/Form/Form';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';
import ThemeType from '@/types/ThemeType';

// Login Component
const Login = () => {

  const currentTheme : ThemeType = useReactiveVar(theme);
  
  const { setSearchText } = useContext(SearchContext);
  useEffect(() => {
    if ( setSearchText) {
      setSearchText(null);
    }
  }, [setSearchText]);

  return (
    <main className={styles.loginMain} style={{backgroundImage: `url(${currentTheme.backgroundImage})`, backgroundColor: currentTheme.backgroundColor}}>
      <div className={styles.navbar}>
        <div className={styles.logoWrapper}>
          <Logo></Logo>
        </div>
      </div>

      <div className={styles.loginWrapper}>
        <SloganComponent></SloganComponent>
        <Form
          name="Login"
          data={loginFormData}
          mainButton="Login"
          alternateButton="Sign Up"
          type="login"
        ></Form>
      </div>
    </main>
  );
};

export default Login;
