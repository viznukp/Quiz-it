import routes from "src/routes";

import { Login, Signup } from "components/Authentication";
import Dashboard from "components/Dashboard";
import PublicPage from "components/PublicPage";
import {
  ShowQuestions,
  CreateQuestion,
  EditQuestion,
} from "components/QuestionBuilder";
import QuizAttempt from "components/QuizAttempt";
import QuizManager from "components/QuizAttempt/QuizManager";
import QuizConfiguration from "components/QuizConfiguration";
import QuizResult from "components/QuizResult";
import { General, Category, Redirection } from "components/Settings";
import SubmissionList from "components/SubmissionList";
import { isLoggedIn } from "utils/auth";

export const APP_ROUTES = [
  { component: Login, path: routes.login },
  { component: Signup, path: routes.signup },
  { component: PublicPage, path: routes.publicPage },
  { component: QuizAttempt, path: routes.registerQuiz },
  { component: QuizResult, path: routes.quiz.result },
  { component: General, path: routes.settings.general },
  { component: Category, path: routes.settings.categories },
  { component: QuizManager, path: routes.attemptQuiz },
  { component: Redirection, path: routes.settings.redirections },
  { component: ShowQuestions, path: routes.quiz.questions },
  { component: QuizConfiguration, path: routes.quiz.configure },
  { component: CreateQuestion, path: routes.quiz.question.new },
  { component: EditQuestion, path: routes.quiz.question.edit },
  { component: SubmissionList, path: routes.quiz.submissions },
  {
    component: Dashboard,
    path: routes.root,
    condition: isLoggedIn(),
    redirectRoute: routes.login,
  },
];
