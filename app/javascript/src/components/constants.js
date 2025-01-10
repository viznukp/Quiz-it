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
  configure: "configure",
};

export const QUIZ_TABS = [
  {
    label: i18n.t("labels.questions"),
    id: QUIZ_TAB_IDS.questions,
    path: routes.admin.quiz.questions,
  },
  {
    label: i18n.t("labels.submissions"),
    id: QUIZ_TAB_IDS.submissions,
    path: routes.admin.quiz.submissions,
  },
  {
    label: i18n.t("labels.configure"),
    id: QUIZ_TAB_IDS.configure,
    path: routes.admin.quiz.configure,
  },
];

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE_SIZE_PUBLIC = 6;
export const DEFAULT_PAGE_INDEX = 1;

export const BASE_URL = "http://localhost:3000";
