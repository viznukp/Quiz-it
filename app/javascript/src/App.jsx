import React from "react";

import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";

import { PageNotFound } from "components/commons";
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
        <Redirect exact from="/" to={routes.root} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
