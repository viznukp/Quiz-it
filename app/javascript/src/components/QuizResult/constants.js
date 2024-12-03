import i18n from "i18next";

export const STATUSES = {
  correct: "correct",
  wrong: "wrong",
  incorrect: "incorrect",
  unanswered: "unanswered",
};

export const QUESTION_STATUS_MESSAGES = {
  correct: {
    message: i18n.t("messages.info.correctAnswer"),
    style: "bg-green-100",
  },
  wrong: {
    message: i18n.t("messages.info.incorrectAnswer"),
    style: "bg-red-100",
  },
  unanswered: { message: i18n.t("labels.unanswered"), style: "bg-gray-100" },
};
