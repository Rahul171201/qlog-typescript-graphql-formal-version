import styles from "./NavItem.module.css";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import { theme } from "@/reactive-var/theme";

const NavItem = ({name, url, classType} : {name : string, url : string, classType : string}) => {

  const currentTheme = useReactiveVar(theme);

  const handleClearUser = () => {
    if(typeof window !== "undefined" && name === 'LOGOUT'){
      window.localStorage.removeItem('currentuser');
    }
  }

  return (
    <li className={
          classType === "navListItem"
            ? styles.navListItem
            : styles.hamburgerItem
        }
        onClick={handleClearUser}
        >
      <Link
        href={url}
        data-theme={currentTheme}
        className={
          classType === "navListItem"
            ? styles.navListLink
            : styles.hamburgerItemLink
        }
      >
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
