import styles from "./SidebarItem.module.css";

const SidebarItem = ({className, value, index} : {className: string, value: string, index: string}) => {
  return (
    <li className={`${className} ${styles.listItem}`} id={index}>{value}</li>
  );
};

export default SidebarItem;
