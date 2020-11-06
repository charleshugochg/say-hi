import React from "react";
import { Grid } from "semantic-ui-react";

import { gql, useQuery } from "@apollo/client";

import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, data } = useQuery(GET_POSTS_QUERY);
  const { getPosts: posts } = data || {};

  return (
    <Grid stackable columns={3}>
      <Grid.Row>
        {loading
          ? "Loading..."
          : posts &&
            posts.map((post) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
      </Grid.Row>
    </Grid>
  );
};

const GET_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      commentCount
      likeCount
    }
  }
`;

export default Home;
