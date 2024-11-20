import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "components/Dashboard";

import routes from "./routes";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact component={Dashboard} path={routes.dashboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
