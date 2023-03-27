import { gql } from "@apollo/client";

const postAnswerMutation = gql`
    mutation POST_ANSWER($ownerId: Int!, $content: String!, $qid: Int!, $attachments: [String]!){
        postAnswer(ownerId : $ownerId, content: $content, qid: $qid, attachments: $attachments){
            id,
            content,
            upvotes,
            downvotes,
            attachments
        }
    }
`;

export default postAnswerMutation;