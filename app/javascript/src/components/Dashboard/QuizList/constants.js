import { columnsToTableSchema } from "utils/schemaBuilder";

const QUIZ_TABLE_COLUMNS = [
  "name",
  "createdOn",
  "category",
  "status",
  "actions",
];

const OTHER_PROPS = {
  name: { isDisabledInColumnFilter: true },
  actions: { excludeFromColumnFilter: true },
};

export const QUIZ_TABLE_SCHEMA = columnsToTableSchema(
  QUIZ_TABLE_COLUMNS,
  OTHER_PROPS
);

export const FILTER_INITIAL_VALUES = {
  name: "",
  category: [],
  status: "",
};
