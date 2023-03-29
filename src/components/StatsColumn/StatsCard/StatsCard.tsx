import styles from "./StatsCard.module.css";
import Link from "next/link";
import lato from "@/data/latoFont";
import ImageComponent from "../../ImageComponent/ImageComponent";
import { useReactiveVar } from "@apollo/client";
import { theme } from "@/reactive-var/theme";
import { useEffect, useState } from "react";
import ThemeType from "@/types/ThemeType";

const StatsCard = ({ id, title, description, attachments } : {id : number, title: string, description: string, attachments: string[]}) => {

  // current theme
  const currentTheme : ThemeType = useReactiveVar(theme);

  const [className, setClassName] = useState<string>('theme1');

  useEffect(() => {
    setClassName(currentTheme.type);
  }, [currentTheme]);

  return (
    <Link
      href={"/q/" + id}
      className={className === 'theme1' ? `${styles.cardWrapper} ${lato.className} ${styles.theme1}` : `${styles.cardWrapper} ${lato.className} ${styles.theme2}`}
    >
      <div className={styles.cardTitle}>{title}</div>
      <hr className={styles.horizontalRule}></hr>
      <div className={styles.cardContent}>
        {description}
        {attachments.map((attachment, index) => {
          return <ImageComponent key={index} src={attachment}></ImageComponent>;
        })}
      </div>
    </Link>
  );
};

export default StatsCard;
