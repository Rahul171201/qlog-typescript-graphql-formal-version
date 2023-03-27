import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useEffect } from 'react';
import handleLogin from '@/helper/handleLogin';
import handleRegister from '@/helper/handleRegister';
import UserType from '@/types/UserType';
import ActionStateType from '@/types/ActionStateType';
import getUsersQuery from '@/queries/getUsersQuery';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import addUserMutation from '@/mutations/addUserMutation';

const useFormSubmit = (
  formType: string,
  dispatchForm: Dispatch<ActionStateType>
) => {

  const {data,refetch} = useQuery(getUsersQuery);
  const [addUser, {}] = useMutation(addUserMutation);

  useEffect(() => {
    refetch();
  }, [refetch])
  

  return useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      const inputFields = e.currentTarget.getElementsByTagName('input');
      if (formType === 'login') {
        dispatchForm({ type: 'start-login' });
        setTimeout(() => {
          const res = handleLogin(data.users, inputFields);
          dispatchForm({
            type: 'login',
            fields: inputFields,
            result: res
          });
        }, 3000);
      } else if (formType === 'register') {
        dispatchForm({ type: 'start-registration' });
        setTimeout(() => {
          const res = handleRegister(data.users, inputFields, addUser);
          dispatchForm({
            type: 'register',
            fields: inputFields,
            result:res
          });
          
        }, 3000);
      } else {
        throw new Error(
          `Invalid form type: Unrecognized form type ${formType}`
        );
      }
    },
    [addUser, data, dispatchForm, formType]
  );
};

export default useFormSubmit;
