import i18n from "i18next";
import * as yup from "yup";

export const CONFIGURATION_PANELS = {
  dashboard: {
    id: "dashboard",
    title: i18n.t("labels.quizSettings"),
  },
  visibility: {
    id: "visibility",
    title: i18n.t("configurationCards.visibility.title"),
  },
  quizTiming: {
    id: "quizTiming",
    title: i18n.t("configurationCards.timing.title"),
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
