import styles from '../styles/Login.module.css';
import Logo from '@/components/Logo/Logo';
import SloganComponent from '@/components/SloganComponent/SloganComponent';
import { useContext, useEffect } from 'react';
import loginFormData from '@/data/loginFormData';
import { SearchContext } from '@/contexts/SearchContext';
import Form from '@/components/Form/Form';

// Login Component
const Login = () => {
  
  const { setSearchText } = useContext(SearchContext);

  useEffect(() => {
    if ( setSearchText) {
      setSearchText(null);
    }
  }, [setSearchText]);

  return (
    <main className={styles.loginMain}>
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
