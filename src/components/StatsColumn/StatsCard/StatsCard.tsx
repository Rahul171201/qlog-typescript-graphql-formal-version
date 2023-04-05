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
  const currentTheme = useReactiveVar(theme);

  const [className, setClassName] = useState<string>('light');

  useEffect(() => {
    setClassName(currentTheme as ThemeType);
  }, [currentTheme]);

  return (
    <Link
      href={"/q/" + id}
      className={className === 'light' ? `${styles.cardWrapper} ${lato.className} ${styles.light}` : `${styles.cardWrapper} ${lato.className} ${styles.dark}`}
    >
      <div className={styles.cardTitle}>{title}</div>
      <hr className={styles.horizontalRule}></hr>
      <div className={styles.cardContent}>
        {description}
        <div className={styles.attachmentBox}>
            {attachments.map((attachment, index) => {
          return <ImageComponent key={index} src={attachment}></ImageComponent>;
        })}
        </div>
        
      </div>
    </Link>
  );
};

export default StatsCard;
