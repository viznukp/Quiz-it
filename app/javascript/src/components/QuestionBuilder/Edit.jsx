import React from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { useShowQuestion } from "src/hooks/reactQuery/useQuestionsApi";
import routes from "src/routes";

import {
  Container,
  NavBar,
  PageLoader,
  ContentWrapper,
} from "components/commons";
import { useEditQuestion } from "hooks/reactQuery/useQuestionsApi";

import Form from "./Form";

const Edit = () => {
  const history = useHistory();
  const { slug, id } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: editQuestion } = useEditQuestion();
  const { data: { quiz } = {}, isLoading } = useShowQuestion(slug, id);

  const handleEdit = ({ formData }) => {
    editQuestion(
      { id, payload: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("quiz");
          history.push(routes.admin.quiz.questions.replace(":slug", slug));
        },
      }
    );
  };

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container>
      <NavBar backButtonVisible title={quiz?.name} />
      <ContentWrapper>
        <Form
          handleSubmit={handleEdit}
          initialValues={quiz.question || {}}
          primaryButtonLabel={t("labels.update")}
        />
      </ContentWrapper>
    </Container>
  );
};

export default Edit;
