import { gql } from "@apollo/client";

const updateAnswerMutation = gql`
    mutation UPDATE_ANSWER($id: Int!, $content: String, $upvotes: Int, $downvotes: Int, $attachments: [String], $currentUserId: Int!){
        updateAnswer(id : $id, content: $content, upvotes: $upvotes, downvotes: $downvotes, attachments: $attachments, currentUserId: $currentUserId){
            id,
            content,
            upvotes,
            downvotes,
            attachments
        }
    }
`;

export default updateAnswerMutation;