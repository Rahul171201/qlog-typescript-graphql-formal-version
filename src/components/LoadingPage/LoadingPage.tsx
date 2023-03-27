import styles from './LoadingPage.module.css';
import Image from 'next/image';
import lato from '@/data/latoFont';

const LoadingPage = () => {
    return (  <main className={styles.mainWrapper}>
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