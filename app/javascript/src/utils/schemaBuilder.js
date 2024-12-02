import i18n from "i18next";

export const columnsToTableSchema = (columns = [], otherProps = {}) =>
  columns.map(column => ({
    title: i18n.t(`labels.${column}`),
    dataIndex: column,
    key: column,
    ...otherProps[column],
  }));
