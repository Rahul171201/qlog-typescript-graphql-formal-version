import styles from "./NavItem.module.css";
import Link from "next/link";

const NavItem = ({name, url, classType} : {name : string, url : string, classType : string}) => {
  return (
    <li>
      <Link
        href={url}
        className={
          classType === "navListItem"
            ? styles.navListItem
            : styles.hamburgerItem
        }
      >
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
