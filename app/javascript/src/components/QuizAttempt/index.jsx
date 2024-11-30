import React, { useState } from "react";

import { Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { useShowQuiz } from "hooks/reactQuery/useQuizzesApi";

import ShowQuestion from "./ShowQuestion";

const QuizAttempt = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { data = {}, isLoading } = useShowQuiz(slug);
  if (isLoading) {
    return <div>{t("labels.loading")}</div>;
  }
  const { quiz: { questions = [] } = {} } = data;
  const questionCount = questions.length;

  return (
    <div className="neeto-ui-bg-gray-200 h-screen overflow-y-auto p-6">
      <div className="mx-aut1 of 2 flex max-w-3xl flex-col gap-2 rounded-3xl bg-white p-16">
        <Typography weight="semibold">
          Question {currentQuestionIndex + 1} of {questionCount}{" "}
        </Typography>
        <ShowQuestion
          options={questions?.[currentQuestionIndex].options}
          question={questions?.[currentQuestionIndex].question}
        />
        <div className="mt-6 flex gap-3">
          <Button
            disabled={currentQuestionIndex === 0}
            label={t("labels.previous")}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          />
          <Button
            disabled={currentQuestionIndex === questionCount - 1}
            label={t("labels.next")}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          />
          <Button label={t("labels.saveAndSubmit")} />
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
