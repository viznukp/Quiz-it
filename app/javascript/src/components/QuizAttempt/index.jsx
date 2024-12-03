import React, { useState } from "react";

import { Typography, Button } from "neetoui";
import { includes } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import submissionsApi from "apis/submissions";
import { RegisterStandardUser } from "components/Authentication";
import { PageLoader } from "components/commons";
import { useShowQuizWithoutAnswer } from "hooks/reactQuery/useQuizzesApi";
import { getFromLocalStorage, STORAGE_KEYS } from "utils/storage";

import ShowQuestion from "./ShowQuestion";

const QuizAttempt = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const history = useHistory();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const { data = {}, isLoading } = useShowQuizWithoutAnswer(slug);

  if (isLoading) {
    return <PageLoader fullScreen />;
  }

  const { quiz = {} } = data;
  const { questions = [] } = quiz;
  const questionCount = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionCount - 1;

  const handleResponseSubmission = async () => {
    try {
      await submissionsApi.create({
        email: getFromLocalStorage(STORAGE_KEYS.EMAIL),
        quiz_slug: slug,
        status: "completed",
        answers: userAnswers,
      });
      history.replace(routes.quiz.result.replace(":slug", slug));
    } catch (error) {
      logger.error(error);
    }
  };

  const isOptionInAnswers = (questionId, selectedChoice) =>
    includes({ questionId, selectedChoice }, userAnswers);

  const handleOptionSelect = (questionId, selectedChoice) => {
    setUserAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(
        answer => answer.questionId === questionId
      );

      if (existingAnswerIndex !== -1) {
        const existingAnswer = prevAnswers[existingAnswerIndex];

        if (existingAnswer.selectedChoice === selectedChoice) {
          return prevAnswers.filter(answer => answer.questionId !== questionId);
        }

        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, selectedChoice };

        return updatedAnswers;
      }

      return [...prevAnswers, { questionId, selectedChoice }];
    });
  };

  if (!isUserAuthenticated) {
    return (
      <div className="neeto-ui-bg-gray-100 flex h-screen items-center justify-center overflow-y-auto p-6">
        <div className=" max-w-6xl sm:max-w-md lg:max-w-xl ">
          <Typography style="h1">{quiz.name}</Typography>
          <RegisterStandardUser
            className="mt-12"
            onSuccess={() => setIsUserAuthenticated(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="neeto-ui-bg-gray-200 flex h-screen items-center justify-center overflow-y-auto p-6">
      <div className="flex w-full max-w-lg flex-col gap-2 rounded-3xl bg-white p-16 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <Typography weight="semibold">
          {t("labels.questionFromPool", {
            current: currentQuestionIndex + 1,
            total: questionCount,
          })}
        </Typography>
        <ShowQuestion
          isOptionInAnswers={isOptionInAnswers}
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
            disabled={isLastQuestion}
            label={t("labels.next")}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          />
          {isLastQuestion && (
            <Button
              label={t("labels.saveAndSubmit")}
              onClick={handleResponseSubmission}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
