import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

import "./App.css";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import MenuBar from "./components/MenuBar";

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
