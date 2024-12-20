import i18n from "i18next";
import routes from "src/routes";

export const QUIZ_STATUSES = {
  PUBLISHED: { STATUS: "published" },
  DRAFT: { STATUS: "draft" },
};

export const SUBMISSION_STATUSES = {
  COMPLETED: { STATUS: "completed" },
  INCOMPLETE: { STATUS: "incomplete" },
};

export const QUIZ_TAB_IDS = {
  questions: "questions",
  submissions: "submissions",
};

export const QUIZ_TABS = [
  {
    label: i18n.t("labels.questions"),
    id: QUIZ_TAB_IDS.questions,
    path: routes.quiz.questions,
  },
  {
    label: i18n.t("labels.submissions"),
    id: QUIZ_TAB_IDS.submissions,
    path: routes.quiz.submissions,
  },
];

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE_SIZE_PUBLIC = 5;
export const DEFAULT_PAGE_INDEX = 1;

export const BASE_URL = "localhost:3000";
