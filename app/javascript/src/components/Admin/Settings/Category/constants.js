import i18n from "i18next";
import * as yup from "yup";

export const CATEGORY_SELECTOR_VALIDATION_SCHEMA = yup.object().shape({
  category: yup.object().required(i18n.t("messages.error.requiredField")),
});
