import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";

import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <Switch>
      <Route exact component={Dashboard} path={routes.dashboard} />
      <Route exact component={Signup} path={routes.signup} />
    </Switch>
  </BrowserRouter>
);

export default App;
