import i18n from "i18next";
import * as yup from "yup";

export const MIN_OPTIONS_COUNT = 2;
export const MAX_OPTIONS_COUNT = 6;
export const DEFAULT_OPTIONS_COUNT = 4;

export const QUESTION_BUILDER_FORM_INITIAL_VALUES = {
  question: "",
  options: Array.from({ length: DEFAULT_OPTIONS_COUNT }, () => ""),
};

export const QUESTION_BUILDER_FORM_VALIDATION_SCHEMA = yup.object({
  question: yup
    .string()
    .trim()
    .required(i18n.t("messages.error.requiredQuestion")),
  options: yup
    .array()
    .of(yup.string().trim().required(i18n.t("messages.error.nonEmptyOption")))
    .min(
      MIN_OPTIONS_COUNT,
      i18n.t("messages.error.minRequiredOptions", { MIN_OPTIONS_COUNT })
    )
    .max(
      MAX_OPTIONS_COUNT,
      i18n.t("messages.error.maxAllowedOptions", { MAX_OPTIONS_COUNT })
    )
    .test("uniqueOptions", i18n.t("messages.error.uniqueOptions"), options => {
      const optionsSet = new Set(options);

      return optionsSet.size === options.length;
    }),
});
