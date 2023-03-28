import styles from './LoadingPage.module.css';
import Image from 'next/image';
import lato from '@/data/latoFont';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';

const LoadingPage = () => {

  const currentTheme = useReactiveVar(theme);

    return (  <main className={styles.mainWrapper} style={{backgroundImage: `url(${currentTheme.backgroundImage})`, backgroundColor: currentTheme.backgroundColor}}>
      <div className={`${styles.loadingWrapper} ${lato.className}`}>
        <div className={styles.loadingText}>Loading</div>
        <div className={styles.iconWrapper}>
          <Image
            src="/images/loading.png"
            alt="loading icon"
            width={100}
            height={100}
            className={styles.icon}
          ></Image>
        </div>
      </div>
    </main> );
}
 
export default LoadingPage;