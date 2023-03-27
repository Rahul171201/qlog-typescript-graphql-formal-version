import { gql } from "@apollo/client";

const postQuestionMutation = gql`
    mutation POST_QUESTION($title: String!, $description: String!, $ownerId: Int!, $tags: [String]!, $attachments: [String]!){
        postQuestion(title: $title, description: $description, ownerId: $ownerId, tags: $tags, attachments: $attachments){
            id,
            title,
            description,
            tags,
            date,
            rating,
            attachments
        }
    }
`;

export default postQuestionMutation;