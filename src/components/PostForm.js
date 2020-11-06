import React, { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../hooks";

import { GET_POSTS_QUERY } from "../graphql";

const PostForm = () => {
  const [errors, setErrors] = useState({});
  const { onSubmit, onChange, values, setValues } = useForm(postFormCallback, {
    body: "",
  });
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update: (proxy, { data: { createPost: post } }) => {
      const { getPosts: posts } = proxy.readQuery({ query: GET_POSTS_QUERY });
      proxy.writeQuery({
        query: GET_POSTS_QUERY,
        data: {
          getPosts: [post, ...posts],
        },
      });
      setValues({ body: "" });
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  function postFormCallback() {
    createPost();
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            name="body"
            placeholder="what would you say..."
            onChange={onChange}
            value={values.body}
          />
          <Form.Button>Submit</Form.Button>
        </Form.Field>
      </Form>
      {Object.keys(errors).length !== 0 && (
        <Message error list={Object.values(errors)} />
      )}
    </div>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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
    }
  }
`;

export default PostForm;
