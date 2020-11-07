import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const state =
    location.pathname === "/" ? "home" : location.pathname.substr(1);

  const menuBar = user ? (
    <Menu pointing secondary size="massive">
      <Menu.Item
        color="teal"
        name={user.username}
        active={state === "home"}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item color="teal" name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive">
      <Menu.Item
        color="teal"
        name="home"
        active={state === "home"}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          color="teal"
          name="login"
          active={state === "login"}
          as={Link}
          to="/login"
        />
        <Menu.Item
          color="teal"
          name="register"
          active={state === "register"}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default MenuBar;
