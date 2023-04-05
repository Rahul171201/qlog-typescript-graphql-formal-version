import styles from './EditProfile.module.css';
import Navbar from '@/components/Navbar/Navbar';
import lato from '@/data/latoFont';
import { SyntheticEvent } from 'react';
import Router from 'next/router';
import { useMutation, useReactiveVar } from '@apollo/client';
import { user } from '@/reactive-var/user';
import updateUserMutation from '@/mutations/updateUserMutation';
import { theme } from '@/reactive-var/theme';
import { Button } from '@mui/material';

const EditProfile = () => {
  // currently logged in user
  const currentUser = useReactiveVar(user);

  const currentTheme = useReactiveVar(theme);

  const [updateUser, {}] = useMutation(updateUserMutation);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const fields = e.currentTarget.getElementsByTagName('input');
    const name = fields[0].value;
    const email = fields[1].value;

    if (currentUser && name && email) {
      updateUser({
        variables: {
          userId: currentUser.userId,
          userName: name,
          email: email
        }
      })
      user({
        ...currentUser,
        userName: name,
        email: email
      });
      Router.push('/profile/' + currentUser.userId);
    }
    else{
      throw new Error('Error: Cannot edit profile');
    }
  };

  return (
    <div className={styles.editProfileWrapper}  style={{backgroundImage: `url(${currentTheme.backgroundImage})`, backgroundColor: currentTheme.backgroundColor}}>
      <Navbar></Navbar>
      <div className={`${styles.formWrapper} ${lato.className}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            type="text"
            placeholder="Enter full name"
            className={styles.inputField}
            required
          ></input>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className={styles.inputField}
            required
          ></input>
          <div className={styles.submitButton}>
          <Button type='submit' variant='contained' size='large'>
            EDIT
          </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
