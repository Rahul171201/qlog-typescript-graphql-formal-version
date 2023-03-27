import UserType from '@/types/UserType';
import find from 'lodash/find';

const handleLogin = (
  users: {
    userId: number;
    userName: string;
    password: string;
    email?: string;
  }[],
  fields: HTMLCollectionOf<HTMLElement>
) => {

  if(!users) return null;

  const userId = Number(fields[0].getAttribute('value'));
  const password = fields[1].getAttribute('value');

  // get the user from users database
  const user = find(users, {userId: userId});

  if (user === undefined) {
    return null;
  }

  if (user.password === password) {
    const finalUser = user;
    console.log();
    return finalUser as UserType;
  }
  return null;
};

export default handleLogin;
