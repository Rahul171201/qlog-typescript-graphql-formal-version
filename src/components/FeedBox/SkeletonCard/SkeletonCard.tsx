import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonCard.module.css";
import { useReactiveVar } from "@apollo/client";
import { theme } from "@/reactive-var/theme";

const SkeletonCard = () => {

  const currentTheme = useReactiveVar(theme);

  return (
    <div data-theme={currentTheme} className={styles.skeletonWrapper}>
      <SkeletonTheme baseColor={currentTheme==="light" ? "#EDE9D5" : "#1A5F7A"} highlightColor={currentTheme==="light" ? "white" : "#159895"}>
        <Skeleton height={80} className={styles.headerSkeleton}></Skeleton>
        <div className={styles.contentWrapper}>
          <Skeleton
            count={4}
            height={40}
            className={styles.contentSkeleton}
          ></Skeleton>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonCard;
