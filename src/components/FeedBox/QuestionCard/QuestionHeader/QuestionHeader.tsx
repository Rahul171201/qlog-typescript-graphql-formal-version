import styles from "./QuestionHeader.module.css";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import QuestionType from "@/types/QuestionType";
import { useReactiveVar } from "@apollo/client";
import { theme } from "@/reactive-var/theme";

const QuestionHeader = ({q} : {q: QuestionType}) => {

  const currentTheme = useReactiveVar(theme);

  return (
    <div  className={styles.questionHeading}>
      <Link data-theme={currentTheme} href={"/q/" + q.id} className={styles.questionTitle}>
        {q.title}
      </Link>
      <div className={styles.rating}>
        <Image
          src="/images/star.png"
          alt="star-icon"
          width={30}
          height={30}
        ></Image>
        <span className={styles.ratingValue}>{q.rating}</span>
      </div>
    </div>
  );
};

export default memo(QuestionHeader);
