import React from "react";

import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";

import { Login, Signup, RegisterStandardUser } from "components/Authentication";
import { PrivateRoute, PageNotFound } from "components/commons";
import Dashboard from "components/Dashboard";
import PublicPage from "components/PublicPage";
import {
  ShowQuestions,
  CreateQuestion,
  EditQuestion,
} from "components/QuestionBuilder";
import QuizAttempt from "components/QuizAttempt";
import QuizResult from "components/QuizResult";
import { General, Category } from "components/Settings";
import SubmissionList from "components/SubmissionList";
import { isLoggedIn } from "utils/auth";
import queryClient from "utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact component={Signup} path={routes.signup} />
        <Route exact component={Login} path={routes.login} />
        <Route exact component={PublicPage} path={routes.publicPage} />
        <Route exact component={QuizAttempt} path={routes.attemptQuiz} />
        <Route exact component={QuizResult} path={routes.quiz.result} />
        <Route exact component={General} path={routes.settings.general} />
        <Route exact component={Category} path={routes.settings.categories} />
        <Route exact component={ShowQuestions} path={routes.quiz.questions} />
        <Route
          exact
          component={CreateQuestion}
          path={routes.quiz.question.new}
        />
        <Route
          exact
          component={EditQuestion}
          path={routes.quiz.question.edit}
        />
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
        <PrivateRoute
          exact
          component={Dashboard}
          condition={isLoggedIn()}
          path={routes.root}
          redirectRoute={routes.login}
        />
        <Redirect exact from="/" to={routes.root} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
