import i18n from "i18next";
import * as yup from "yup";

const requiredFieldErrorMessage = i18n.t("messages.error.requiredField");

export const SIGNUP_FORM_INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const LOGIN_FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_FORM_VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup.string().required(requiredFieldErrorMessage),
  lastName: yup.string().required(requiredFieldErrorMessage),
  email: yup
    .string()
    .email(i18n.t("messages.error.invalidEmail"))
    .required(requiredFieldErrorMessage),
  password: yup.string().required(requiredFieldErrorMessage),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], i18n.t("messages.error.matchPassword"))
    .required(requiredFieldErrorMessage),
});

export const LOGIN_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(i18n.t("messages.error.invalidEmail"))
    .required("Required"),
  password: yup.string().required(requiredFieldErrorMessage),
});
