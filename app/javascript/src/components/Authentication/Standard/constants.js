import i18n from "i18next";
import * as yup from "yup";

const requiredFieldErrorMessage = i18n.t("messages.error.requiredField");

export const REGISTRATION_FORM_INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
};

export const REGISTRATION_FORM_VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup.string().required(requiredFieldErrorMessage),
  lastName: yup.string().required(requiredFieldErrorMessage),
  email: yup
    .string()
    .email(i18n.t("messages.error.invalidEmail"))
    .required(requiredFieldErrorMessage),
});
