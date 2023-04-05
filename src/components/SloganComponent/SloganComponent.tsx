import styles from "./SloganComponent.module.css";
import itim from "@/data/itimFont";
import Image from "next/image";

const SloganComponent = () => {
  return (
    <div className={`${styles.descriptionBox} ${itim.className}`}>
      <img src={'/images/q4.jpg'} alt={'starting image'} className={styles.backgroundImage}></img>
    </div>
  );
};

export default SloganComponent;
