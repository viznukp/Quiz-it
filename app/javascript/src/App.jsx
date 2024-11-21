import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "src/routes";

import Dashboard from "components/Dashboard";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact component={Dashboard} path={routes.dashboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
