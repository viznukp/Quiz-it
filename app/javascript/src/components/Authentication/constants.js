import i18n from "i18next";
import * as yup from "yup";

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
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup
    .string()
    .email(i18n.t("messages.error.invalidEmail"))
    .required("Required"),
  password: yup.string().required("Required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], i18n.t("messages.error.matchPassword"))
    .required("Required"),
});

export const LOGIN_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(i18n.t("messages.error.invalidEmail"))
    .required("Required"),
  password: yup.string().required("Required"),
});
