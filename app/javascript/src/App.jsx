import React from "react";

import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";

import { PrivateRoute, PageNotFound } from "components/commons";
import Dashboard from "components/Dashboard";
import { isLoggedIn } from "utils/auth";
import queryClient from "utils/queryClient";

import { APP_ROUTES } from "./constants";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        {APP_ROUTES.map((route, index) => (
          <Route exact key={index} {...route} />
        ))}
        <PrivateRoute
          exact
          component={Dashboard}
          condition={isLoggedIn()}
          path={routes.admin.dashboard}
          redirectRoute={routes.admin.login}
        />
        <Redirect exact from={routes.root} to={routes.admin.dashboard} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
