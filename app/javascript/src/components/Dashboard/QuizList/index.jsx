import React from "react";

import { Table } from "neetoui";
import { useFetchQuizzes } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import { LabelToLink, PageLoader } from "components/commons";
import { dateFromTimeStamp } from "utils/dateTime";

import StatusTag from "./StatusTag";

import { QUIZ_TABLE_SCHEMA } from "../constants";

const QuizList = () => {
  const transformQuizDataForTableDisplay = quizzes =>
    quizzes?.map(({ id, name, status, updatedAt, category, slug }) => ({
      id,
      key: id,
      name: (
        <LabelToLink
          label={name}
          pathTo={routes.questionBuilder.replace(":slug", slug)}
          truncateAfter={20}
        />
      ),
      status: <StatusTag label={status} primaryLabel="published" />,
      category,
      createdOn: dateFromTimeStamp(updatedAt),
    }));

  const { data: quizzes = {}, isLoading } = useFetchQuizzes();

  if (isLoading) return <PageLoader className="h-64" />;

  return (
    <Table
      rowSelection
      columnData={QUIZ_TABLE_SCHEMA}
      rowData={quizzes ? transformQuizDataForTableDisplay(quizzes) : []}
    />
  );
};

export default QuizList;
