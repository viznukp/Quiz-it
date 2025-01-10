import React from "react";

import { StatusTag } from "components/Admin/commons";
import { utcToLocalTime } from "utils/dateTime";

export const transformSubmissionDataForTableDisplay = data =>
  data?.map(
    ({
      submission: {
        id,
        submissionDate,
        correctAnswersCount,
        wrongAnswersCount,
        unansweredCount,
        totalQuestions,
        status,
      },
      user: { name, email },
    }) => ({
      id,
      key: id,
      name,
      email,
      submissionDate: utcToLocalTime(submissionDate),
      correctAnswers: correctAnswersCount,
      wrongAnswers: wrongAnswersCount,
      unanswered: unansweredCount,
      questions: totalQuestions,
      status: <StatusTag key={id} label={status} primaryLabel="completed" />,
    })
  );
