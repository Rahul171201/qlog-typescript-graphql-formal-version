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

// Profile Card Component
const ProfileCard = () => {
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
      <div className={`${styles.profileCard} ${lato.className}`}>
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
          <div className={styles.uploadProfile}>
            <label htmlFor="profile-image" className={styles.labelProfileImage}>
              <Image
                src="/images/camera.png"
                alt="camera icon"
                width={40}
                height={40}
              ></Image>
            </label>

            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              id="profile-image"
              onChange={(e) => {
                const profileImage = e.target;
                const reader = new FileReader();
                if (profileImage.files) {
                  reader.readAsDataURL(profileImage.files[0]);
                  reader.onload = () => {
                    const newUser = {
                      ...currentUser,
                      profileImage: reader.result
                    } as UserType;
                    console.log(typeof newUser.profileImage);
                    updateUser({
                      variables: {
                        userId: newUser.userId,
                        profileImage: newUser.profileImage
                      }
                    })
                    user(newUser);
                  };
                  e.target.value = '';
                }
              }}
            ></input>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <span className={styles.name}>
            {currentUser ? currentUser.userName : ''}
          </span>
          <span className={styles.email}>
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
