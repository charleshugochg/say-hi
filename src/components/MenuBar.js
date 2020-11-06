import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

const MenuBar = () => {
  const pathname = useLocation().pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [active, setActive] = useState(path);

  const handleItemClick = (e, { name }) => setActive(name);

  return (
    <Menu pointing secondary size="massive">
      <Menu.Item
        name="home"
        active={active === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={active === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={active === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
