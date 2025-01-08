import React from "react";

import { LeftArrow } from "neetoicons";
import { Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import routes from "src/routes";

import { useFetchResult } from "hooks/reactQuery/useSubmissionsApi";

import Score from "./Score";
import ShowAnswer from "./ShowAnswer";

const QuizResult = () => {
  const { t } = useTranslation();
  const { slug, userId } = useParams();
  const history = useHistory();

  const {
    data: {
      result: {
        questions = [],
        correctAnswersCount = 0,
        wrongAnswersCount = 0,
        unansweredCount = 0,
        totalQuestions = 0,
      } = {},
    } = {},
  } = useFetchResult(slug, userId);

  return (
    <div className="neeto-ui-bg-gray-200 flex items-center justify-center overflow-y-auto p-6">
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-6 rounded-3xl bg-white p-16 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <Typography style="h2">{t("labels.yourResult")}</Typography>
        <div className="flex w-full justify-between border-b-2 p-3">
          <Button
            icon={LeftArrow}
            iconPosition="left"
            label={t("labels.backToHome")}
            onClick={() => history.push(routes.public.home)}
          />
          <Typography>
            {t("labels.totalQuestionsCount", { count: totalQuestions })}
          </Typography>
        </div>
        <div className="flex w-full justify-between gap-3">
          <Score
            className="bg-gray-100"
            label={t("labels.score")}
            score={`${correctAnswersCount}/${totalQuestions}`}
          />
          <Score
            className="bg-green-100"
            label={t("labels.correct")}
            score={correctAnswersCount}
          />
          <Score
            className="bg-red-100"
            label={t("labels.incorrect")}
            score={wrongAnswersCount}
          />
          <Score
            className="bg-gray-100"
            label={t("labels.unanswered")}
            score={unansweredCount}
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          {questions.map((question, index) => (
            <ShowAnswer
              key={question.id}
              questionCount={index + 1}
              {...question}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
