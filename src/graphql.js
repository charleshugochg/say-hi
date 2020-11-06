import { gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      commentCount
      comments {
        id
        username
        body
      }
      likes {
        id
        username
      }
    }
  }
`;
