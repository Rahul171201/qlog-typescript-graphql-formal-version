import styles from "./NavItem.module.css";
import Link from "next/link";

const NavItem = ({name, url, classType} : {name : string, url : string, classType : string}) => {


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
