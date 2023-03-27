import { gql } from '@apollo/client';

const getAnswersQuery = gql`
  query GET_ANSWERS {
    answers {
      id
      owner{
        userId,
		    userName,
      }
      content
      question{
        id,
        title,
        description,
        attachments,
      }
      upvotes
      downvotes
      attachments
    }
  }
`;

export default getAnswersQuery;