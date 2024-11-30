import React, { useState } from "react";

import { Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import submissionsApi from "apis/submissions";
import { PageLoader } from "components/commons";
import { useShowQuiz } from "hooks/reactQuery/useQuizzesApi";
import { getFromLocalStorage, STORAGE_KEYS } from "utils/storage";

import ShowQuestion from "./ShowQuestion";

const QuizAttempt = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const { data = {}, isLoading } = useShowQuiz(slug);

  if (isLoading) {
    return <PageLoader fullScreen />;
  }

  const { quiz: { questions = [] } = {} } = data;
  const questionCount = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const handleResponseSubmission = async () => {
    try {
      await submissionsApi.create({
        email: getFromLocalStorage(STORAGE_KEYS.EMAIL),
        quiz_slug: slug,
        status: "completed",
        answers: userAnswers,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleOptionSelect = (questionId, selectedChoice) => {
    setUserAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(
        answer => answer.questionId === questionId
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, selectedChoice };

        return updatedAnswers;
      }

      return [...prevAnswers, { questionId, selectedChoice }];
    });
  };

  return (
    <div className="neeto-ui-bg-gray-200 flex h-screen items-center justify-center overflow-y-auto p-6">
      <div className="flex w-full max-w-lg flex-col gap-2 rounded-3xl bg-white p-16 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <Typography weight="semibold">
          Question {currentQuestionIndex + 1} of {questionCount}
        </Typography>
        <ShowQuestion
          questionId={currentQuestion.id}
          onOptionSelect={handleOptionSelect}
          {...currentQuestion}
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
          <Button
            label={t("labels.saveAndSubmit")}
            onClick={handleResponseSubmission}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
