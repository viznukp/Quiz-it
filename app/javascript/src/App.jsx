import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "src/routes";

import Dashboard from "components/Dashboard";

import SignUp from "./components/Authentication/Signup";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact component={Dashboard} path={routes.dashboard} />
      <Route exact component={SignUp} path="/signup" />
    </Switch>
  </BrowserRouter>
);

export default App;
