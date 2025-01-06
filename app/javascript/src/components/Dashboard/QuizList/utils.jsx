import React from "react";

import routes from "src/routes";

import { StatusTag, TruncatedLabel } from "components/commons";
import { utcToLocalTime } from "utils/dateTime";

import ActionList from "./ActionList";

export const transformQuizDataForTableDisplay = quizzes =>
  quizzes?.map(
    ({ id, name, submissionsCount, status, createdOn, category, slug }) => ({
      id,
      slug,
      key: id,
      name: (
        <TruncatedLabel
          isLink
          label={name}
          pathForLink={routes.quiz.questions.replace(":slug", slug)}
        />
      ),
      submissionsCount,
      status: <StatusTag label={status} primaryLabel="published" />,
      category,
      createdOn: utcToLocalTime(createdOn),
      actions: <ActionList quizName={name} slug={slug} status={status} />,
    })
  );
