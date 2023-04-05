import styles from './Sidebar.module.css';
import lato from '@/data/latoFont';
import { Dispatch, SetStateAction, useState } from 'react';
import SidebarItem from './SidebarItem/SidebarItem';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';

// sidebar component
const Sidebar = () => {

  // current theme
  const currentTheme = useReactiveVar(theme);

  // current selected side bar item
  const [currentItem, setCurrentItem]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState(-1);

  return (
    <div data-theme={currentTheme} className={`${styles.sideBarWrapper} ${lato.className}`}>
      <div className={styles.sideBar}>
        <ul className={styles.list}>
          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Sports"
            index={1}
            imageURL={'/images/football.png'}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Politics"
            index={2}
            imageURL={'/images/court.png'}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Dance"
            index={3}
            imageURL={'/images/dancing.png'}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Movies"
            index={4}
            imageURL={'/images/video.png'}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Entertainment"
            index={5}
            imageURL={'/images/dancer.png'}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Finance"
            index={6}
            imageURL={'/images/hand.png'}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Health"
            index={7}
            imageURL={'/images/heartbeat.png'}
          ></SidebarItem>
          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Technology"
            index={8}
            imageURL={'/images/technology.png'}
          ></SidebarItem>

          <SidebarItem
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            value="Music"
            index={9}
            imageURL={'/images/music-note.png'}
          ></SidebarItem>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
