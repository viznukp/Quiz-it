import React, { useState, useEffect } from "react";

import { Table } from "neetoui";

import quizzesApi from "apis/quizzes";
import { LabelToLink } from "components/commons";
import { dateFromTimeStamp } from "utils/dateTime";

import StatusTag from "./StatusTag";

import { QUIZ_TABLE_SCHEMA } from "../constants";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  const transformQuizDataForTableDisplay = () =>
    quizzes?.map(({ id, name, status, updated_at, category }) => ({
      id,
      key: id,
      name: <LabelToLink label={name} truncateAfter={20} />,
      status: <StatusTag label={status} primaryLabel="published" />,
      category,
      createdOn: dateFromTimeStamp(updated_at),
    }));

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.fetch();
      setQuizzes(response.data);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <Table
      rowSelection
      columnData={QUIZ_TABLE_SCHEMA}
      rowData={quizzes ? transformQuizDataForTableDisplay() : []}
    />
  );
};

export default QuizList;
