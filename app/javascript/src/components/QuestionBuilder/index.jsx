import React, { useState, useEffect } from "react";

import { Link as LinkIcon } from "neetoicons";
import { Button, Typography, Toastr } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import { Container, NavBar, PageLoader, NoData } from "components/commons";
import { TAB_IDS } from "components/commons/NavBar/constants";
import { QUIZ_STATUSES } from "components/constants";

import QuestionDisplayCard from "./QuestionDisplayCard";
import SaveAction from "./SaveAction";

const QuestionBuilder = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const history = useHistory();
  const {
    DRAFT: { STATUS: STATUS_DRAFT },
    PUBLISHED: { STATUS: STATUS_PUBLISHED },
  } = QUIZ_STATUSES;
  const [saveType, setSaveType] = useState(STATUS_DRAFT);

  const handleQuizSave = async () => {
    try {
      await quizzesApi.update(slug, { status: saveType });
      refetchQuizzes();
    } catch (error) {
      logger.error(error);
    }
  };

  const copyQuizLink = async () => {
    const link = `${routes.base}${routes.attemptQuiz.replace(":slug", slug)}`;
    try {
      await navigator.clipboard.writeText(link);
      Toastr.info(t("messages.info.linkCopied"));
    } catch (error) {
      Toastr.error(t("messages.error.failedToCopyLink", { error }));
    }
  };

  const {
    data: { quiz } = {},
    isLoading,
    refetch: refetchQuizzes,
  } = useShowQuiz(slug);

  useEffect(() => {
    if (quiz?.status) {
      setSaveType(
        quiz.status === STATUS_DRAFT ? STATUS_PUBLISHED : STATUS_DRAFT
      );
    }
  }, [quiz]);

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container
      navbar={
        <NavBar
          backButtonVisible
          isTabsEnabled
          activeTab={TAB_IDS.questions}
          quizSlug={slug}
          title={quiz?.name}
        >
          {quiz?.status === STATUS_DRAFT && (
            <Typography className="italic text-gray-400">
              {t("labels.draftSavedAt", { dateAndTime: quiz?.lastUpdatedAt })}
            </Typography>
          )}
          <SaveAction
            saveAction={handleQuizSave}
            saveType={saveType}
            setSaveType={setSaveType}
          />
          <Button
            icon={LinkIcon}
            style="text"
            tooltipProps={{
              content: t("labels.copyQuizLink"),
              position: "bottom",
            }}
            onClick={copyQuizLink}
          />
        </NavBar>
      }
    >
      <div className="flex justify-end">
        <Button
          label={t("labels.addNewQuestion")}
          onClick={() =>
            history.push(routes.quiz.question.new.replace(":slug", slug))
          }
        />
      </div>
      {isEmpty(quiz.questions) ? (
        <NoData
          message={t("messages.info.noEntityToShow", {
            entity: t("labels.questionsLower"),
          })}
        />
      ) : (
        <div className="mb-12 mt-4 flex flex-col gap-4">
          <Typography>
            {t("labels.questionsCount", { count: quiz.questions.length })}
          </Typography>
          {quiz.questions.map(question => (
            <QuestionDisplayCard
              key={question.id}
              slug={slug}
              {...question}
              refetchQuizzes={refetchQuizzes}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default QuestionBuilder;
