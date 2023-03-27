import styles from "./BlankCard.module.css";

const BlankCard = ({title, content} : {title: string, content: string}) => {
  return (
    <div className={styles.blankCardWrapper}>
      <div className={styles.title}>{title}</div>
      <hr className={styles.horizontalRule}></hr>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default BlankCard;
