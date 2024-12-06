import React, { useState, useEffect } from "react";

import { Button, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import { Container, NavBar, PageLoader } from "components/commons";
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
    } catch (error) {
      logger.error(error);
    }
  };

  const { data: { quiz } = {}, isLoading, refetch } = useShowQuiz(slug);

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
          <SaveAction
            saveAction={handleQuizSave}
            saveType={saveType}
            setSaveType={setSaveType}
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
        <div className="flex h-64 items-center justify-center">
          <Typography style="h3" weight="semibold">
            {t("messages.info.noQuestionsToShow")}
          </Typography>
        </div>
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
              refetchQuizzes={refetch}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default QuestionBuilder;
