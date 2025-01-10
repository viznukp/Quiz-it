import React, { useState, useMemo, useEffect } from "react";

import { Typography, Button } from "neetoui";
import { includes } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import { PageLoader } from "components/commons";
import { useFetchQuestions } from "hooks/reactQuery/usePublicApi";
import { useCreateSubmission } from "hooks/reactQuery/useSubmissionsApi";
import { getPublicUserFromLocalStorage } from "utils/storage";
import { buildRoute } from "utils/url";

import ShowQuestion from "./ShowQuestion";
import Timer from "./Timer";

const QuizAttempt = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const history = useHistory();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const userId = useMemo(() => getPublicUserFromLocalStorage(), []);

  const { mutate: createSubmission } = useCreateSubmission();

  const {
    data: {
      quiz: { questions = [], timeLimit = 0, randomizationSeed } = {},
    } = {},
    isLoading,
    isError,
  } = useFetchQuestions({ slug, userId });

  useEffect(() => {
    if (isError) {
      history.replace(routes.public.home);
    }
  }, [history, isError]);

  if (isLoading || isError) {
    return <PageLoader fullScreen />;
  }

  const questionCount = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionCount - 1;

  const handleSubmission = status => {
    createSubmission(
      {
        submission: {
          status,
          answers: userAnswers,
          seed: randomizationSeed,
        },
        slug,
        userId,
      },
      {
        onSuccess: () =>
          history.replace(
            buildRoute(routes.public.quiz.result, { slug, userId })
          ),
      }
    );
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

  return (
    <div className="neeto-ui-bg-gray-200 flex h-screen items-center justify-center overflow-y-auto p-6">
      <div className="flex w-full max-w-lg flex-col gap-2 rounded-3xl bg-white p-16 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {timeLimit > 0 && (
          <Timer
            callbackIntervalInSeconds={60}
            totalTimeInMinutes={timeLimit}
            onTimerEnd={() => handleSubmission("incomplete")}
          />
        )}
        <Typography weight="semibold">
          {t("labels.questionFromPool", {
            current: currentQuestionIndex + 1,
            total: questionCount,
          })}
        </Typography>
        <ShowQuestion
          isOptionInAnswers={isOptionInAnswers}
          questionId={currentQuestion?.id}
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
              onClick={() => handleSubmission("completed")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
