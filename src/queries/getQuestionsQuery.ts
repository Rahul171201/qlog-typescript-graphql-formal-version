import { gql } from '@apollo/client';

const getQuestionsQuery = gql`
  query GET_QUESTIONS($offset : Int, $limit: Int) {
    questions(offset: $offset, limit: $limit) {
      id
      title
      description
      owner{
        userId
      }
      tags
      date
      rating
      answers {
        id
      }
      attachments
    }
  }
`;

export default getQuestionsQuery;
