import { gql } from '@apollo/client';

const addUserMutation = gql`
  mutation ADD_USER($userName: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
      userId
      userName
      email
      password
      profileImage
      asked {
        id
      }
      answered {
        id
      }
      hasRated
      hasUpvoted
      hasDownvoted
    }
  }
`;

export default addUserMutation;
