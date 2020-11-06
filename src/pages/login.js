import React, { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../hooks";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginCallback, {
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update: (_, results) => {
      history.push("/");
      console.log(results);
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginCallback() {
    login();
  }

  return (
    <div className="form-container">
      <h1 className="page-header">Login</h1>
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <Form.Input
          name="username"
          label="Enter Username"
          placeholder="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          name="password"
          label="Enter Password"
          placeholder="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Button primary>Login</Form.Button>
      </Form>
      {Object.keys(errors).length !== 0 && (
        <Message error list={Object.values(errors)} />
      )}
    </div>
  );
};

const LOGIN_USER_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export default Login;
