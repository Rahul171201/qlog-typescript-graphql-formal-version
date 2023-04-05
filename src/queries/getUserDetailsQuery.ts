import { gql } from '@apollo/client';


const getUserDetailsQuery = gql`
   query GET_USER($id : Int!){
        user(id: $id){
            userId,
		    userName,
		    email,
		    password,
		    profileImage,
		    asked{
			    id
                title
                description
                tags
                rating
                attachments
		    },
		    answered{
                id,
                content,
                question{
                    title
                }
                qid,
                attachments
            }
		    hasRated,
		    hasUpvoted,
		    hasDownvoted,
        }
    }
`;

export default getUserDetailsQuery;
