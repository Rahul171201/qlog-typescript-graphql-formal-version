import styles from './ProfileCard.module.css';
import Image from 'next/image';
import lato from '@/data/latoFont';
import Router from 'next/router';
import ToolTip from './ToolTip/ToolTip';
import { useEffect } from 'react';
import UserType from '@/types/UserType';
import { useMutation, useReactiveVar } from '@apollo/client';
import { user } from '@/reactive-var/user';
import FetchLoader from '../FetchLoader/FetchLoader';
import updateUserMutation from '@/mutations/updateUserMutation';
import { theme } from '@/reactive-var/theme';

// Profile Card Component
const ProfileCard = () => {

  // current theme
  const currentTheme = useReactiveVar(theme);
  
  // currently Logged in User
  const currentUser = useReactiveVar(user);

  const [updateUser, {}] = useMutation(updateUserMutation);

  const handleRedirect = () => {
    Router.push('/profile/edit');
  };

  useEffect(() => {
    if (!currentUser) Router.push('/login');
  }, [currentUser]);

  if (currentUser) {
    return (
      <div data-theme={currentTheme} className={`${styles.profileCard} ${lato.className}`}>
        <div className={styles.editProfile} onClick={handleRedirect}>
          <ToolTip></ToolTip>
        </div>
        <div className={styles.profileImageContainer}>
          <Image
            src={currentUser ? (currentUser.profileImage as string) : ''}
            alt="profile-image"
            width={150}
            height={150}
            className={styles.profileImage}
            id="final-profile-image"
          ></Image>
        </div>
        <div className={styles.infoContainer}>
          <span className={styles.name}>
            {currentUser ? currentUser.userName : ''}
          </span>
          <span data-theme={currentTheme} className={styles.email}>
            {currentUser ? currentUser.email : ''}
          </span>
        </div>
      </div>
    );
  } else {
    return <FetchLoader></FetchLoader>
  }
};

export default ProfileCard;
