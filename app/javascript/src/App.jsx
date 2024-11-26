import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Dashboard from "components/Dashboard";
import QuestionBuilder from "components/QuestionBuilder";
import Create from "components/QuestionBuilder/Create";
import queryClient from "utils/queryClient";
import { STORAGE_KEYS, getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage(STORAGE_KEYS.TOKEN);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          <Route exact component={Signup} path={routes.signup} />
          <Route exact component={Login} path={routes.login} />
          <Route
            exact
            component={QuestionBuilder}
            path={routes.quiz.questions}
          />
          <Route exact component={Create} path={routes.quiz.new} />
          <PrivateRoute
            component={Dashboard}
            condition={isLoggedIn}
            path={routes.root}
            redirectRoute="/login"
          />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
