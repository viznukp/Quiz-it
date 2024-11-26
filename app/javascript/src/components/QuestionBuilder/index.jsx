import React from "react";

import { Button, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import { Container, NavBar, PageLoader } from "components/commons";

import QuestionDisplayCard from "./QuestionDisplayCard";

const QuestionBuilder = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const history = useHistory();

  const { data: { quiz } = {}, isLoading } = useShowQuiz(slug);

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container navbar={<NavBar backButtonVisible title={quiz?.name} />}>
      <div className="flex justify-end">
        <Button
          label={t("labels.addNewQuestion")}
          onClick={() => history.push(routes.quiz.new.replace(":slug", slug))}
        />
      </div>
      {isEmpty(quiz.questions) ? (
        <div className="flex h-64 items-center justify-center">
          <Typography style="h3" weight="semibold">
            No Questions to show
          </Typography>
        </div>
      ) : (
        <div className="mb-12 mt-4 flex flex-col gap-4">
          {quiz.questions.map((question, index) => (
            <QuestionDisplayCard key={index} {...question} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default QuestionBuilder;
