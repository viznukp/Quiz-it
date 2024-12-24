import React from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { useShowQuestion } from "src/hooks/reactQuery/useQuestionsApi";
import routes from "src/routes";

import questionsApi from "apis/questions";
import {
  Container,
  NavBar,
  PageLoader,
  ContentWrapper,
} from "components/commons";

import Form from "./Form";

const Edit = () => {
  const history = useHistory();
  const { slug, id } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: { quiz } = {}, isLoading } = useShowQuestion(slug, id);

  const handleSubmit = async ({ formData }) => {
    try {
      await questionsApi.update(id, formData);
      queryClient.invalidateQueries("quiz");
      history.push(routes.quiz.questions.replace(":slug", slug));
    } catch (error) {
      logger.error(error);
    }
  };

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container>
      <NavBar backButtonVisible title={quiz?.name} />
      <ContentWrapper>
        <Form
          handleSubmit={handleSubmit}
          initialValues={quiz.question || {}}
          primaryButtonLabel={t("labels.update")}
        />
      </ContentWrapper>
    </Container>
  );
};

export default Edit;
