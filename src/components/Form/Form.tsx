import styles from './Form.module.css';
import Input from './Input/Input';
import lato from '@/data/latoFont';
import { Dispatch, useReducer, useEffect } from 'react';
import Link from 'next/link';
import ForgotPassword from '@/components/Form/ForgotPassword/ForgotPassword';
import formReducer from '@/reducers/formReducer';
import useFormSubmit from '@/hooks/useFormSubmit';
import FormStateType from '@/types/FormStateType';
import ActionStateType from '@/types/ActionStateType';
import { user } from '@/reactive-var/user';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';
import { Button } from '@mui/material';
import { darkButtonStyles, lightButtonStyles } from '@/data/buttonStyles';
import StatusLoaders from './StatusLoaders/StatusLoaders';
import Router from 'next/router';

const Form = (props: any) => {
  const currentTheme = useReactiveVar(theme);

  const [formState, dispatchForm]: [FormStateType, Dispatch<ActionStateType>] =
    useReducer(formReducer, {
      user: null,
      users: null,
      status: 'idle'
    });

  useEffect(() => {
    if (formState.status === 'successful-login') {
      if (formState.user) {
        if (typeof window !== 'undefined')
          window.localStorage.setItem(
            'currentuser',
            JSON.stringify(formState.user)
          );
        user(formState.user);
      }
      Router.push('/feed');
    } else if (formState.status === 'successful-registration') {
      Router.push('/login');
    }
  }, [formState.status, formState.user, formState.users]);

  // submit handler
  const handleSubmit = useFormSubmit(props.type, dispatchForm);

  return (
    <div
      data-theme={currentTheme}
      className={`${styles.formWrapper} ${lato.className}`}
    >
      <div className={styles.header}>{props.name}</div>
      <form
        aria-label="form"
        className={styles.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {props.data.map(
          (
            item: {
              name: string;
              type: string;
              placeholder: string;
              label: string;
              image: string;
            },
            idx: number
          ) => {
            return (
              <Input
                name={item.name}
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                key={idx}
                image={item.image}
              ></Input>
            );
          }
        )}
        {props.type === 'login' ? <ForgotPassword></ForgotPassword> : <></>}
        <div className={styles.buttonWrapper} data-theme={currentTheme}>
          <Button
            type="submit"
            variant="contained"
            sx={
              currentTheme === 'light'
                ? { ...lightButtonStyles, width: '300px' }
                : { ...darkButtonStyles, width: '300px' }
            }
          >
            {props.name}
          </Button>
        </div>

        <Link
          data-theme={currentTheme}
          className={styles.linkWrapper}
          href={props.type === 'login' ? '/register' : '/login'}
        >
          <span className={styles.alternateLink}>{props.alternateButton}</span>
        </Link>
      </form>
      <StatusLoaders formState={formState}></StatusLoaders>
    </div>
  );
};

export default Form;
