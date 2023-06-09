import Logo from '@/components/Logo/Logo';
import Search from '@/components/Navbar/Search/Search';
import styles from './Navbar.module.css';
import lato from '@/data/latoFont';
import Image from 'next/image';
import { memo, useState } from 'react';
import NavItem from './NavItem/NavItem';
import { useReactiveVar } from '@apollo/client';
import { user } from '@/reactive-var/user';
import ToggleButton from './ToggleButton/ToggleButton';
import { theme } from '@/reactive-var/theme';

const Navbar = () => {
  //current theme
  const currentTheme = useReactiveVar(theme);

  const [hamburger, setHamburger] = useState(false);

  // hamburger handler
  const handleHamburger = () => {
    setHamburger(!hamburger);
  };

  // currently Logged in User
  const currentUser = useReactiveVar(user);

  return (
    <div data-theme={currentTheme} className={styles.navbarWrapper}>
      {hamburger ? (
        <div className={styles.overlay} onClick={handleHamburger}></div>
      ) : (
        <></>
      )}
      <div className={styles.navbar}>
        <div className={styles.leftBar}>
          <Logo></Logo>

          <Search></Search>
        </div>
        <div className={styles.rightBar}>
          <div className={styles.toggleButtonWrapper}>
            <ToggleButton></ToggleButton>
          </div>

          <div className={`${styles.navListWrapper} ${lato.className}`}>
            <div className={styles.navList}>
              <ul className={styles.navList}>
                <NavItem
                  name="FEED"
                  url="/feed"
                  classType="navListItem"
                ></NavItem>
                <NavItem
                  name="PROFILE"
                  url={
                    currentUser ? '/profile/' + currentUser.userId : '/login'
                  }
                  classType="navListItem"
                ></NavItem>
                <NavItem
                  name="LOGOUT"
                  url="/login"
                  classType="navListItem"
                ></NavItem>
              </ul>
            </div>
          </div>
          <div className={`${styles.hamburgerWrapper} ${lato.className}`}>
            <Image
              src="/images/hamburger.png"
              alt="hamburger-icon"
              width={50}
              height={50}
              className={styles.hamburgerIcon}
              onClick={handleHamburger}
            ></Image>
            {hamburger ? (
              <div className={styles.hamburgerMenu}>
                <ul className={styles.menuList}>
                  <NavItem
                    name="FEED"
                    url="/feed"
                    classType="hamburgerItem"
                  ></NavItem>
                  <NavItem
                    name="PROFILE"
                    url={
                      currentUser ? '/profile/' + currentUser.userId : '/login'
                    }
                    classType="hamburgerItem"
                  ></NavItem>
                  <NavItem
                    name="LOGOUT"
                    url="/login"
                    classType="hamburgerItem"
                  ></NavItem>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Navbar);
