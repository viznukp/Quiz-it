import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Dashboard from "components/Dashboard";
import { STORAGE_KEYS, getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage(STORAGE_KEYS);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact component={Dashboard} path={routes.root} />
        <Route exact component={Signup} path={routes.signup} />
        <Route exact component={Login} path={routes.login} />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
