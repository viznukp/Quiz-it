import React from "react";

import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";

import { Container, NavBar, PageLoader } from "components/commons";

import Form from "./Form";

const QuestionBuilder = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  const { data: { quiz } = {}, isLoading } = useShowQuiz(slug);

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container navbar={<NavBar backButtonVisible title={quiz?.name} />}>
      <div className="flex justify-end">
        <Button label={t("labels.addNewQuestion")} />
      </div>
      <Form slug={slug} />
    </Container>
  );
};

export default QuestionBuilder;
