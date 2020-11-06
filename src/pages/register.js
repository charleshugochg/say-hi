import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../hooks";

const Register = (props) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(addUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update: (_, results) => {
      history.push("/");
      console.log(results);
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function addUserCallback() {
    addUser();
  }

  return (
    <div className="form-container">
      <h1 className="page-header">Register</h1>
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
          name="email"
          label="Enter Email"
          placeholder="email"
          type="email"
          value={values.email}
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
        <Form.Input
          name="confirmPassword"
          label="Confirm Password"
          placeholder="confirm password"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Form.Button primary>Submit</Form.Button>
      </Form>
      {Object.keys(errors).length !== 0 && (
        <Message error list={Object.values(errors)} />
      )}
    </div>
  );
};

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export default Register;
