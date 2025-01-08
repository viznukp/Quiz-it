import { columnsToTableSchema } from "utils/schemaBuilder";

const SUBMISSION_TABLE_COLUMNS = [
  "name",
  "email",
  "submissionDate",
  "correctAnswers",
  "wrongAnswers",
  "unanswered",
  "questions",
  "status",
];

const EXCLUSIVE_PROPS = {
  name: { isDisabledInColumnFilter: true, width: 150 },
  email: { width: 200 },
};

export const SUBMISSION_TABLE_SCHEMA = columnsToTableSchema(
  SUBMISSION_TABLE_COLUMNS,
  EXCLUSIVE_PROPS
);

export const FILTER_INITIAL_VALUES = {
  name: null,
  email: null,
  status: null,
};

export const SUBMISSION_REPORT_FILENAME = "quiz_submissions_report.pdf";
