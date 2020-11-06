import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, Icon } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: id,
    },
  });
  const [unlikePost] = useMutation(UNLIKE_POST_MUTATION, {
    variables: {
      postId: id,
    },
    onError: (err) => {
      console.error(err.graphQLErrors[0]);
    },
  });
  const likeButton = user ? (
    likes.find((like) => like.username === user.username) ? (
      <Button icon onClick={unlikePost}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button icon basic onClick={likePost}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button icon basic as={Link} to={"/login"}>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right">
      {likeButton}
      <Label as="a" basic pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      likes {
        id
        username
      }
    }
  }
`;

const UNLIKE_POST_MUTATION = gql`
  mutation unlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      id
      likeCount
      likes {
        id
        username
      }
    }
  }
`;

export default LikeButton;
