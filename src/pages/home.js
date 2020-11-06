import React, { useContext } from "react";
import { Grid, Transition } from "semantic-ui-react";

import { useQuery } from "@apollo/client";

import { AuthContext } from "../contexts/auth";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

import { GET_POSTS_QUERY } from "../graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_POSTS_QUERY);
  const { getPosts: posts } = data || {};

  return (
    <Grid stackable columns={4}>
      <Grid.Row>
        <h1 className="page-header">Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Transition.Group>
          {loading
            ? "Loading..."
            : posts &&
              posts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
