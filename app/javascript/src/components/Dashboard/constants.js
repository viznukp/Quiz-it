import i18n from "i18next";

export const QUIZ_TABLE_SCHEMA = [
  {
    title: i18n.t("labels.name"),
    dataIndex: "name",
    key: "name",
    isDisabledInColumnFilter: true,
  },
  {
    title: i18n.t("labels.createdOn"),
    dataIndex: "createdOn",
    key: "createdOn",
  },
  {
    title: i18n.t("labels.category"),
    dataIndex: "category",
    key: "category",
  },
  {
    title: i18n.t("labels.status"),
    dataIndex: "status",
    key: "status",
  },
];
