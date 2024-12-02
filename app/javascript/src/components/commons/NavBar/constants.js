import i18n from "i18next";
import routes from "src/routes";

export const TAB_IDS = { questions: "questions", submissions: "submissions" };

export const TABS = [
  {
    label: i18n.t("labels.questions"),
    id: TAB_IDS.questions,
    path: routes.quiz.questions,
  },
  {
    label: i18n.t("labels.submissions"),
    id: TAB_IDS.submissions,
    path: routes.quiz.submissions,
  },
];
