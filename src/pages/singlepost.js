import React, { useContext, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Grid,
  Image,
  Card,
  Form,
  Button,
  Icon,
  Label,
  Transition,
} from "semantic-ui-react";
import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";

import { AuthContext } from "../contexts/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const { loading, data } = useQuery(GET_POST_QUERY, {
    variables: {
      postId: id,
    },
    onError: (err) => {
      console.error(err.graphQLErrors[0]);
    },
  });
  const [comment, setComment] = useState("");
  const [createComment, { loading: commentLoading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      variables: {
        postId: id,
        body: comment,
      },
      onError: (err) => {
        console.error(err.graphQLErrors[0]);
      },
      update: () => {
        setComment("");
        commentInputRef.current.blur();
      },
    }
  );
  const { getPost } = data || {};
  const {
    username,
    body,
    createdAt,
    likeCount,
    likes,
    commentCount,
    comments,
  } = getPost || {};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!getPost) {
    return <p>Post not found!</p>;
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card className="post-card" fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <Button as="div" labelPosition="right">
                <Button color="blue" icon basic>
                  <Icon name="comments" />
                </Button>
                <Label color="blue" as="a" basic pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton
                  post={{ id }}
                  callback={() => history.push("/")}
                />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Create a comment:</p>
                <Form className={commentLoading ? "loading" : ""}>
                  <div className="ui fluid action input">
                    <input
                      type="text"
                      placeholder="Comment ..."
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      onClick={createComment}
                      disabled={comment === "" || commentLoading}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          <Transition.Group>
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && comment.username === user.username && (
                    <DeleteButton post={{ id }} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Transition.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const GET_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
      }
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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

export default SinglePost;
