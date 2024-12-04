import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";

import { Login, Signup, RegisterStandardUser } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Dashboard from "components/Dashboard";
import PublicPage from "components/PublicPage";
import QuestionBuilder from "components/QuestionBuilder";
import Clone from "components/QuestionBuilder/Clone";
import Create from "components/QuestionBuilder/Create";
import Edit from "components/QuestionBuilder/Edit";
import QuizAttempt from "components/QuizAttempt";
import Settings from "components/Settings";
import queryClient from "utils/queryClient";
import { STORAGE_KEYS, getFromLocalStorage } from "utils/storage";

import QuizResult from "./components/QuizResult";
import SubmissionList from "./components/SubmissionList";

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
          <Route exact component={Create} path={routes.quiz.question.new} />
          <Route exact component={Edit} path={routes.quiz.question.edit} />
          <Route exact component={Clone} path={routes.quiz.question.clone} />
          <Route exact component={PublicPage} path={routes.publicPage} />
          <Route exact component={QuizAttempt} path={routes.attemptQuiz} />
          <Route exact component={QuizResult} path={routes.quiz.result} />
          <Route exact component={Settings} path={routes.settings} />
          <Route
            exact
            component={SubmissionList}
            path={routes.quiz.submissions}
          />
          <Route
            exact
            component={RegisterStandardUser}
            path={routes.registerStandardUser}
          />
          <Route
            exact
            component={QuestionBuilder}
            path={routes.quiz.questions}
          />
          <PrivateRoute
            component={Dashboard}
            condition={isLoggedIn}
            path={routes.root}
            redirectRoute={routes.login}
          />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
