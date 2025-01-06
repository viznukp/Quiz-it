import React from "react";

import { Link as LinkIcon } from "neetoicons";
import { Button, Typography, Toastr } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import { Container, NavBar, NoData, ContentWrapper } from "components/commons";
import {
  QUIZ_STATUSES,
  BASE_URL,
  QUIZ_TABS,
  QUIZ_TAB_IDS,
} from "components/constants";
import { useUpdateQuiz } from "hooks/reactQuery/useQuizzesApi";
import { utcToLocalTime } from "utils/dateTime";

import QuestionDisplayCard from "./QuestionDisplayCard";

const Show = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const {
    DRAFT: { STATUS: STATUS_DRAFT },
    PUBLISHED: { STATUS: STATUS_PUBLISHED },
  } = QUIZ_STATUSES;

  const { mutate: updateQuiz } = useUpdateQuiz();

  const copyQuizLink = async () => {
    const link = `${BASE_URL}${routes.attemptQuiz.replace(":slug", slug)}`;
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
    refetch: refetchQuiz,
  } = useShowQuiz(slug);

  const handleQuizSave = status => {
    updateQuiz(
      {
        slug,
        payload: { status: status === STATUS_DRAFT ? "published" : "draft" },
      },
      {
        onSuccess: () => {
          refetchQuiz();
          queryClient.invalidateQueries("quizzes");
        },
      }
    );
  };

  return (
    <Container>
      <NavBar
        backButtonVisible
        isTabsEnabled
        activeTab={QUIZ_TAB_IDS.questions}
        quizSlug={slug}
        tabs={QUIZ_TABS}
        title={quiz?.name}
      >
        {!isEmpty(quiz?.questions) && (
          <div className="flex gap-3">
            {quiz?.status === STATUS_DRAFT && (
              <Typography className="italic text-gray-400">
                {t("labels.draftSavedAt", {
                  dateAndTime: utcToLocalTime(quiz?.lastUpdatedAt),
                })}
              </Typography>
            )}
            <Button
              label={
                quiz?.status === STATUS_DRAFT
                  ? t("labels.publish")
                  : t("labels.unpublish")
              }
              onClick={() => handleQuizSave(quiz?.status)}
            />
            {quiz?.status === STATUS_PUBLISHED && (
              <Button
                icon={LinkIcon}
                style="text"
                tooltipProps={{
                  content: t("labels.copyQuizLink"),
                  position: "bottom",
                }}
                onClick={copyQuizLink}
              />
            )}
          </div>
        )}
      </NavBar>
      <ContentWrapper isLoading={isLoading}>
        <div className="flex justify-end">
          <Button
            label={t("labels.addNewQuestion")}
            onClick={() =>
              history.push(routes.quiz.question.new.replace(":slug", slug))
            }
          />
        </div>
        {isEmpty(quiz?.questions) ? (
          <NoData
            message={t("messages.info.noEntityToShow", {
              entity: t("labels.questionsLower"),
            })}
          />
        ) : (
          <div className="mb-12 mt-4 flex flex-col gap-4">
            <Typography>
              {t("labels.questionsCount", { count: quiz?.questions.length })}
            </Typography>
            {quiz?.questions.map(question => (
              <QuestionDisplayCard
                key={question.id}
                slug={slug}
                {...question}
              />
            ))}
          </div>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default Show;
