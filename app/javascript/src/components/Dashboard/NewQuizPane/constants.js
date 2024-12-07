import i18n from "i18next";
import * as yup from "yup";

const requiredFieldErrorMessage = i18n.t("messages.error.requiredField");

export const CREATE_NEW_QUIZ_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(requiredFieldErrorMessage),
  category: yup.object().required(requiredFieldErrorMessage),
});
