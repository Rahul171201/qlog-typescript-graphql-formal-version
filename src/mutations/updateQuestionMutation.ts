import { gql } from '@apollo/client';

const updateQuestionMutation = gql`
    mutation UPDATE_QUESTION($id: Int!, $title: String, $description: String, $tags: [String], $rating: Int, $attachments: [String], $currentUserId: Int!){
        updateQuestion(id: $id, title: $title, description: $description, tags: $tags, rating: $rating, attachments: $attachments, currentUserId: $currentUserId){
            id,
            title,
            description,
            tags,
            rating,
            attachments,
        }
    }
`;

export default updateQuestionMutation;
