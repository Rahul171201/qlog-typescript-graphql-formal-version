import { Dispatch, SetStateAction, useEffect } from 'react';
import Router from 'next/router';
import FormStateType from '@/types/FormStateType';
import UserType from '@/types/UserType';
import { ReactiveVar } from '@apollo/client';

const useFormStatus = (
  formState: FormStateType,
  user: ReactiveVar<UserType | null>
) => {
  useEffect(() => {
    if (formState.status === 'idle') {
      // console.log("idle state : form is idle");
    } else if (
      formState.status === 'login-pending' ||
      formState.status === 'registration-pending'
    ) {
      // console.log("pending state : authentication is pending");
    } else if (formState.status === 'successful-login') {
      if (formState.user){
        if(typeof window !== "undefined")
        window.localStorage.setItem('currentuser', JSON.stringify(formState.user));
        user(formState.user);
      };
      Router.push('/feed');
    } else if (formState.status === 'login-failed') {
      alert('Wrong username or password');
    } else if (formState.status === 'successful-registration') {
      Router.push('/login');
    } else if (formState.status === 'registration-failed') {
      alert('Confirm password must match password field');
    } else {
      if (formState.status)
        throw new Error(
          `Unrecognized status in form-state : ${formState.status}`
        );
      else throw new Error(`'status' not defined in form-state`);
    }
  }, [formState.status, formState.user, formState.users, user]);
};

export default useFormStatus;
