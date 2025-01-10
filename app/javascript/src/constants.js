import routes from "src/routes";

import { QuizConfiguration, SubmissionList } from "components/Admin";
import {
  ShowQuestions,
  CreateQuestion,
  EditQuestion,
} from "components/Admin/QuestionBuilder";
import { General, Category, Redirection } from "components/Admin/Settings";
import { Login, Signup } from "components/Authentication";
import {
  PublicHome,
  QuizAttempt,
  QuizResult,
  RegisterQuiz,
} from "components/Public";

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
  { component: PublicHome, path: routes.public.home },
  { component: RegisterQuiz, path: routes.public.quiz.register },
  { component: QuizAttempt, path: routes.public.quiz.attempt },
  { component: QuizResult, path: routes.public.quiz.result },
];
