import i18n from "i18next";
import routes from "src/routes";

export const SETTINGS_TAB_IDS = { general: "general", category: "category" };

export const SETTINGS_TABS = [
  {
    id: SETTINGS_TAB_IDS.general,
    label: i18n.t("labels.general"),
    path: routes.settings.general,
  },
  {
    id: SETTINGS_TAB_IDS.category,
    label: i18n.t("labels.category"),
    path: routes.settings.categories,
  },
];
