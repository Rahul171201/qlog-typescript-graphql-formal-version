import styles from "./ToolTip.module.css";
import { useState } from "react";
import Image from "next/image";
import { useReactiveVar } from "@apollo/client";
import { theme } from "@/reactive-var/theme";

const ToolTip = () => {

  //current theme
  const currentTheme = useReactiveVar(theme);

  // state to show tooltip
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <Image
        src={currentTheme === "light" ? "/images/editing.png" : "/images/editing-white.png"}
        alt="edit profile"
        width={20}
        height={20}
      ></Image>
      {showToolTip ? <div data-theme={currentTheme} className={styles.toolTip}>Edit Profile</div> : <></>}
    </div>
  );
};

export default ToolTip;
