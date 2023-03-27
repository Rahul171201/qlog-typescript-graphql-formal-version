import styles from './Sidebar.module.css';
import lato from '@/data/latoFont';
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState
} from 'react';
import { SearchContext } from '@/contexts/SearchContext';
import SidebarItem from './SidebarItem/SidebarItem';

// sidebar component
const Sidebar = () => {
  // search context
  const { setSearchText } = useContext(SearchContext);

  // current selected side bar item
  const [currentItem, setCurrentItem]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState(-1);

  /**
   * Handles tag selection on the sidebar items
   * @param {SyntheticEvent} e
   * @returns void
   */
  const handleClick = (e: SyntheticEvent) => {
    const listItem = e.currentTarget.getElementsByTagName('li')[0];
    const id = listItem.getAttribute('id');
    if (!id) throw new Error('No attribute of name id found on element');

    const index = +id;
    const value = listItem.innerText;

    if (setSearchText) {
      const selectedElement = index;
      if (currentItem === selectedElement) {
        setCurrentItem(-1);
        setSearchText(null);
        return;
      } else {
        setCurrentItem(selectedElement);
      }
      if (value) {
        const text = value.toLowerCase();
        setSearchText(text);
      }
    }
  };

  return (
    <div className={`${styles.sideBarWrapper} ${lato.className}`}>
      <div className={styles.sideBar}>
        <ul className={styles.list}>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 1 ? 'selected' : 'notSelected'}
              value="Sports"
              index="1"
            ></SidebarItem>
          </div>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 2 ? 'selected' : 'notSelected'}
              value="Politics"
              index="2"
            ></SidebarItem>
          </div>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 3 ? 'selected' : 'notSelected'}
              value="Dance"
              index="3"
            ></SidebarItem>
          </div>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 4 ? 'selected' : 'notSelected'}
              value="Movies"
              index="4"
            ></SidebarItem>
          </div>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 5 ? 'selected' : 'notSelected'}
              value="Entertainment"
              index="5"
            ></SidebarItem>
          </div>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 6 ? 'selected' : 'notSelected'}
              value="Finance"
              index="6"
            ></SidebarItem>
          </div>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 7 ? 'selected' : 'notSelected'}
              value="Health"
              index="7"
            ></SidebarItem>
          </div>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 8 ? 'selected' : 'notSelected'}
              value="Technology"
              index="8"
            ></SidebarItem>
          </div>
          <div onClick={handleClick}>
            <SidebarItem
              className={currentItem === 9 ? 'selected' : 'notSelected'}
              value="Music"
              index="9"
            ></SidebarItem>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
