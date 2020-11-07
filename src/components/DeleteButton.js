import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { GET_POSTS_QUERY } from "../graphql";

const DeleteButton = ({ post: { id }, commentId, callback }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update: (proxy) => {
      const data = proxy.readQuery({ query: GET_POSTS_QUERY });
      const getPosts = data.getPosts.filter((post) => post.id !== id);
      proxy.writeQuery({
        query: GET_POSTS_QUERY,
        data: { getPosts },
      });
      if (callback) callback();
    },
    variables: {
      postId: id,
    },
  });
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update: () => {
      if (callback) callback();
    },
    variables: {
      postId: id,
      commentId,
    },
    onError: (err) => {
      console.error(err);
    },
  });
  const handleDelete = () => {
    setOpenConfirm(false);
    if (commentId) deleteComment();
    else deletePost();
  };
  return (
    <>
      <Button
        onClick={() => setOpenConfirm(true)}
        color="red"
        icon
        style={{ margin: 0, float: "right" }}
      >
        <Icon name="trash" />
      </Button>
      <Confirm
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
