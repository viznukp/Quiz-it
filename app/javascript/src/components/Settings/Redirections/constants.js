import i18n from "i18next";
import * as yup from "yup";

import { BASE_URL } from "components/constants";
import { prefixUrl } from "utils/url";

const urlValidation = yup
  .string()
  .required(i18n.t("messages.error.requiredEntity", { entity: "URL" }))
  .test("is-valid-url", i18n.t("messages.error.enterValidUrl"), value => {
    if (!value) return false;

    const prefixedUrl = prefixUrl(value, BASE_URL);

    if (prefixedUrl.replace(/\/+$/, "") === BASE_URL) return false;

    try {
      new URL(prefixedUrl);

      return true;
    } catch {
      return false;
    }
  });

export const URL_VALIDATION_SCHEMA = yup.object().shape({
  fromUrl: urlValidation,
  toUrl: urlValidation,
});

export const CREATE_REDIRECTION_FORM_INITIAL_VALUES = {
  fromUrl: "/",
  toUrl: "",
};
