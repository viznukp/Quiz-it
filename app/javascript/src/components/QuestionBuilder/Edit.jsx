import React from "react";

import { useTranslation } from "react-i18next";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useShowQuestion } from "src/hooks/reactQuery/useQuestionsApi";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import questionsApi from "apis/questions";
import { Container, NavBar, PageLoader } from "components/commons";

import Form from "./Form";

const Edit = () => {
  const history = useHistory();
  const { slug, id } = useParams();
  const { t } = useTranslation();

  const { data: { quiz } = {}, isLoading } = useShowQuestion(slug, id);

  const { refetch: reloadQuizzes } = useShowQuiz(slug);

  const handleSubmit = async ({ formData }) => {
    try {
      await questionsApi.update(id, formData);
      reloadQuizzes();
      history.push(routes.quiz.questions.replace(":slug", slug));
    } catch (error) {
      logger.error(error);
    }
  };

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container navbar={<NavBar backButtonVisible title={quiz?.name} />}>
      <Form
        handleSubmit={handleSubmit}
        initialValues={quiz.question || {}}
        primaryButtonLabel={t("labels.update")}
      />
    </Container>
  );
};

export default Edit;
