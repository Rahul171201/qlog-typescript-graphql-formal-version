import { gql } from "@apollo/client";

const updateUserMutation = gql`
    mutation UPDATE_USER($userId: Int!, $email: String, $userName: String, $password: String, $profileImage: String){
        updateUserDetails(userId: $userId, email: $email, userName: $userName, password: $password, profileImage: $profileImage){
            userId,
            email,
            userName,
            profileImage
        }
    }
`;

export default updateUserMutation;