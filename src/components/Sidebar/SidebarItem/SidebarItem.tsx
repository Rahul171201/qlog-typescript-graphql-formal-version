import { theme } from '@/reactive-var/theme';
import { useReactiveVar } from '@apollo/client';
import styles from './SidebarItem.module.css';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { useContext } from 'react';
import { SearchContext } from '@/contexts/SearchContext';

const SidebarItem = ({
  currentItem,
  setCurrentItem,
  value,
  index,
  imageURL
}: {
  currentItem: number;
  setCurrentItem: Dispatch<SetStateAction<number>>;
  value: string;
  index: number;
  imageURL: string
}) => {
  const currentTheme = useReactiveVar(theme);

  // search context
  const { setSearchText } = useContext(SearchContext);

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
      } else setCurrentItem(selectedElement);
      if (value) {
        const text = value.toLowerCase();
        setSearchText(text);
      }
    }
  };

  return (
    <div
      className={
        currentItem === index
          ? 'selected' + currentTheme
          : 'notSelected' + currentTheme
      }
      onClick={handleClick}
    >
      <img src={currentTheme === "light" ? imageURL : imageURL.slice(0,imageURL.length-4)+'-white.png'} alt='sports' className={styles.sidebarItemIcon}></img>
      <li
        className={
          currentTheme === 'light'
            ? ` ${styles.listItem} ${styles.theme1}`
            : ` ${styles.listItem} ${styles.theme2}`
        }
        id={`${index}`}
      >
        {value}
      </li>
    </div>
  );
};

export default SidebarItem;
