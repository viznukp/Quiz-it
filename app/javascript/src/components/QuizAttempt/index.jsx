import React, { useState } from "react";

import { Typography, Button, Toastr } from "neetoui";
import { includes, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import publicApi from "apis/public";
import submissionsApi from "apis/submissions";
import { RegisterStandardUser } from "components/Authentication";
import { PageLoader, NoData } from "components/commons";
import { useShowQuiz } from "hooks/reactQuery/usePublicApi";
import { buildRoute } from "utils/url";

import ShowQuestion from "./ShowQuestion";
import Timer from "./Timer";

const QuizAttempt = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const history = useHistory();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([{}]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);
  const questionCount = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionCount - 1;

  const { data = {}, isLoading } = useShowQuiz(slug);
  const fetchQuestions = async userId => {
    try {
      const { quiz: { questions = [], timeLimit = 0 } = {} } =
        await publicApi.fetchQuestionsForAttempt(slug, userId);
      setQuestions(questions);
      setTimeLimit(timeLimit);
      setIsUserAuthenticated(true);
    } catch (error) {
      logger.error(error);
    }
  };

  const checkIfUserHasAlreadyAttemptedQuiz = async registrationResponse => {
    if (registrationResponse.status !== "success") {
      Toastr.error(t("messages.error.default"));

      return;
    }
    setUserId(registrationResponse.id);
    fetchQuestions(registrationResponse.id);
  };

  const handleResponseSubmission = async status => {
    try {
      await submissionsApi.create({
        submission: {
          status,
          answers: userAnswers,
        },
        slug,
        userId,
      });
      if (status === "completed") {
        history.replace(buildRoute(routes.quiz.result, { slug, userId }));
      }
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

  if (isLoading) {
    return <PageLoader fullScreen />;
  }

  if (isEmpty(data)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <NoData
          message={t("messages.error.invalidQuizLink")}
          buttonProps={{
            label: t("labels.tryOtherQuiz"),
            onClick: () => history.push(routes.publicPage),
          }}
        />
      </div>
    );
  }

  const { quiz: { name: quizName } = {} } = data;

  if (!isUserAuthenticated) {
    return (
      <div className="neeto-ui-bg-gray-100 flex h-screen items-center justify-center overflow-y-auto p-6">
        <div className=" max-w-6xl sm:max-w-md lg:max-w-xl ">
          <Typography style="h1">{quizName}</Typography>
          <RegisterStandardUser
            afterRegistration={checkIfUserHasAlreadyAttemptedQuiz}
            className="mt-12"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="neeto-ui-bg-gray-200 flex h-screen items-center justify-center overflow-y-auto p-6">
      <div className="flex w-full max-w-lg flex-col gap-2 rounded-3xl bg-white p-16 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {timeLimit > 0 && (
          <Timer
            callbackIntervalInSeconds={60}
            totalTimeInMinutes={timeLimit}
            onFixedInterval={() => handleResponseSubmission("incomplete")}
            onTimerEnd={() => handleResponseSubmission("completed")}
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
              onClick={() => handleResponseSubmission("completed")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
