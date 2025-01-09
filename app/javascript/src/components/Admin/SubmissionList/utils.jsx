import React from "react";

import { StatusTag } from "components/Admin/commons";
import { utcToLocalTime } from "utils/dateTime";

export const transformSubmissionDataForTableDisplay = data =>
  data?.map(({ submission, user }) => ({
    key: submission.id,
    name: user.name,
    email: user.email,
    submissionDate: utcToLocalTime(submission.submissionDate),
    correctAnswers: submission.correctAnswersCount,
    wrongAnswers: submission.wrongAnswersCount,
    unanswered: submission.unansweredCount,
    questions: submission.totalQuestions,
    status: <StatusTag label={submission.status} primaryLabel="completed" />,
  }));
