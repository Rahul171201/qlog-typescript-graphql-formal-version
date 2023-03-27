import styles from './FetchLoader.module.css';

const FetchLoader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loadImageWrapper}>
        <img src="/images/loading.png" alt="loader" className={styles.loader}></img>
      </div>
    </div>
  );
};

export default FetchLoader;
