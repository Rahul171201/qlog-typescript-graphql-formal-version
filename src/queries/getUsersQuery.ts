import { gql } from '@apollo/client';

const getUsersQuery = gql`
  query GET_USERS{
    users {
      userId
      userName
      email
      password
      profileImage
      asked{
        id
      }
      answered{
        id
      }
      hasRated
      hasUpvoted
      hasDownvoted
    }
  }
`;

export default getUsersQuery;
