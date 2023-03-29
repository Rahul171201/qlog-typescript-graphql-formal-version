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
  index
}: {
  currentItem: number;
  setCurrentItem: Dispatch<SetStateAction<number>>;
  value: string;
  index: number;
}) => {
  const currentTheme = useReactiveVar(theme);

  // search context
  const { setSearchText } = useContext(SearchContext);

  const colorTheme = +currentTheme.type[currentTheme.type.length - 1];

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
          ? 'selected' + currentTheme.type
          : 'notSelected' + currentTheme.type
      }
      onClick={handleClick}
    >
      <li
        className={
          colorTheme === 1
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
