import React from "react";

import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";

import { AdminHome } from "components/Admin";
import { PrivateRoute, PageNotFound } from "components/commons";
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
          component={AdminHome}
          condition={isLoggedIn()}
          path={routes.admin.home}
          redirectRoute={routes.public.home}
        />
        <Redirect exact from={routes.root} to={routes.admin.home} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
