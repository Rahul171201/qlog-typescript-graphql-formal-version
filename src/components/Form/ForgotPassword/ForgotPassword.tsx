import { theme } from "@/reactive-var/theme";
import { useReactiveVar } from "@apollo/client";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {

  const currentTheme = useReactiveVar(theme);

  return (
    <div className={styles.forgotPasswordWrapper}>
      <a href="#" data-theme={currentTheme} className={styles.link}>
        Forgot Password?
      </a>
    </div>
  );
};

export default ForgotPassword;
