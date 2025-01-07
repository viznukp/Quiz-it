import React from "react";

import i18n from "i18next";
import * as yup from "yup";

import Dashboard from "./Dashboard";
import EmailNotification from "./EmailNotification";
import QuizRandomizer from "./QuizRandomizer";
import QuizTime from "./QuizTime";
import Visibility from "./Visibility";

export const CONFIGURATION_PANELS = {
  dashboard: {
    id: "dashboard",
    title: i18n.t("labels.quizSettings"),
    panel: props => <Dashboard {...props} />,
  },
  visibility: {
    id: "visibility",
    title: i18n.t("configurationCards.visibility.title"),
    panel: props => <Visibility {...props} />,
  },
  quizTiming: {
    id: "quizTiming",
    title: i18n.t("configurationCards.timing.title"),
    panel: props => <QuizTime {...props} />,
  },
  emailNotification: {
    id: "emailNotification",
    title: i18n.t("configurationCards.emailNotifications.title"),
    panel: props => <EmailNotification {...props} />,
  },
  questionsAndOptions: {
    id: "questionsAndOptions",
    title: i18n.t("configurationCards.questionsAndOptions.title"),
    panel: props => <QuizRandomizer {...props} />,
  },
};

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  hours: yup
    .number()
    .typeError("Hours must be a number")
    .min(0, "Hours must be a positive number"),
  minutes: yup
    .number()
    .typeError("Minutes must be a number")
    .min(0, "Minutes must be a positive number"),
});
