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
    quizzes?.map(({ id, name, status, updatedAt, category }) => ({
      id,
      key: id,
      name: <LabelToLink label={name} truncateAfter={20} />,
      status: <StatusTag label={status} primaryLabel="published" />,
      category,
      createdOn: dateFromTimeStamp(updatedAt),
    }));

  const fetchQuizzes = async () => {
    try {
      const data = await quizzesApi.fetch();
      setQuizzes(data);
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
