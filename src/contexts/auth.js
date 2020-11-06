import React, { createContext, useReducer } from "react";
import jwt from "jsonwebtoken";

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProvider = (props) => {
  const savedToken = localStorage.getItem("user-token");
  const decodedToken = savedToken ? jwt.decode(savedToken) : {};
  const initialState =
    decodedToken.exp * 1000 > Date.now()
      ? { user: decodedToken }
      : { user: null };

  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userData) => {
    localStorage.setItem("user-token", userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("user-token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
      {...props}
    />
  );
};

export { AuthProvider, AuthContext };
