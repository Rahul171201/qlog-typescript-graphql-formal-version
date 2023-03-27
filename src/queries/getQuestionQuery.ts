import { gql } from '@apollo/client';

const getQuestionQuery = gql`
  query GET_QUESTION($id: Int!) {
    question(id: $id) {
      id
      title
      description
      owner{
        userId,
		    userName,
		    email,
		    password,
		    profileImage,
		    asked{
			    id
		    },
		    answered{
			    id
		    },
		    hasRated,
		    hasUpvoted,
		    hasDownvoted,
      }
      tags
      date
      rating
      answers {
        id
        owner{
          userId
          userName
        }
        content
        question{
          id
        }
        date
        upvotes
        downvotes
        attachments
      }
      attachments
    }
  }
`;

export default getQuestionQuery;
