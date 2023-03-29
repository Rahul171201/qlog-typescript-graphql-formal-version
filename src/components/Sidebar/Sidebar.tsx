import styles from './Sidebar.module.css';
import lato from '@/data/latoFont';
import { Dispatch, SetStateAction, useState } from 'react';
import SidebarItem from './SidebarItem/SidebarItem';

// sidebar component
const Sidebar = () => {

  // current selected side bar item
  const [currentItem, setCurrentItem]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState(-1);

  return (
    <div className={`${styles.sideBarWrapper} ${lato.className}`}>
      <div className={styles.sideBar}>
        <ul className={styles.list}>
          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Sports"
            index={1}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Politics"
            index={2}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Dance"
            index={3}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Movies"
            index={4}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Entertainment"
            index={5}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Finance"
            index={6}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Health"
            index={7}
          ></SidebarItem>
          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Technology"
            index={8}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Music"
            index={9}
          ></SidebarItem>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
