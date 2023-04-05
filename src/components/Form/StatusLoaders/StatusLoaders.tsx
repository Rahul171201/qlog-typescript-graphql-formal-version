import Image from 'next/image';
import AlertBox from '@/components/AlertBox/AlertBox';

import styles from './StatusLoaders.module.css';
import FormStateType from '@/types/FormStateType';

const StatusLoaders = ({ formState }: { formState: FormStateType }) => {
  return (
    <div>
      {formState.status === 'login-pending' ||
      formState.status === 'registration-pending' ? (
        <div aria-label="loading" className={styles.loadingModal}>
          <Image
            src="/images/loading1.png"
            alt="loading-icon"
            width={200}
            height={200}
            className={styles.loadingIcon}
          ></Image>
        </div>
      ) : (
        <></>
      )}

      {formState.status === 'login-failed' ? (
        <AlertBox
          title="Wrong userId or password"
          description="Please enter correct user id and password. No user found with the
          given userid and password"
        ></AlertBox>
      ) : (
        <></>
      )}

      {formState.status === 'registration-failed' ? (
        <AlertBox
          title="Confirm Password mismatch"
          description="Please ensure that password and confirm password fields are same"
        ></AlertBox>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StatusLoaders;
