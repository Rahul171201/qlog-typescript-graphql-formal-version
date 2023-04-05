import UserType from '@/types/UserType';
import { find } from 'lodash';
/**
 * Adds a new user to the database if registration successful
 * @param registeredUsers map of registered users
 * @param fields // input fields in register form
 * @returns final list of registered users
 */
const handleRegister = (
  registeredUsers: {
    userId: number;
    userName: string;
    password: string;
    email?: string;
  }[],
  fields: HTMLCollectionOf<HTMLElement>,
  addUser: Function
) => {
  const email = fields[0].getAttribute('value') as string;
  const userName = fields[1].getAttribute('value') as string;
  const password = fields[2].getAttribute('value') as string;
  const confirmPassword = fields[3].getAttribute('value') as string;

  // check if same email already exists
  const same_user = find(registeredUsers, { email: email });
  console.log(same_user, 'pata nahi');
  if (same_user) {
    console.log('same hai yaar');
    return null;
  }

  if (password === confirmPassword) {
    addUser({
      variables: {
        userName,
        email,
        password
      },
      update: (cache : any, {data} : {data : any} ) => {
        cache.modify({
          fields: {
            users: (existingFieldData : any) => {
                return [...existingFieldData, data.addUser];
            } 
          }
        })
      }
    });
    return {
      userName,
      email,
      password
    } as UserType
  } 
  return null;
};

export default handleRegister;
