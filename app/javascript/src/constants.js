import routes from "src/routes";

import { Login, Signup } from "components/Authentication";
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

export const APP_ROUTES = [
  { component: Login, path: routes.admin.login },
  { component: Signup, path: routes.admin.signup },
  { component: ShowQuestions, path: routes.admin.quiz.questions },
  { component: SubmissionList, path: routes.admin.quiz.submissions },
  { component: QuizConfiguration, path: routes.admin.quiz.configure },
  { component: CreateQuestion, path: routes.admin.quiz.question.new },
  { component: EditQuestion, path: routes.admin.quiz.question.edit },
  { component: General, path: routes.admin.settings.general },
  { component: Category, path: routes.admin.settings.categories },
  { component: Redirection, path: routes.admin.settings.redirections },
  { component: PublicPage, path: routes.public.home },
  { component: QuizAttempt, path: routes.public.quiz.register },
  { component: QuizManager, path: routes.public.quiz.attempt },
  { component: QuizResult, path: routes.public.quiz.result },
];
