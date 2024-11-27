import React from "react";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  useFetchQuestion,
  useShowQuiz,
} from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import questionsApi from "apis/questions";
import { Container, NavBar, PageLoader } from "components/commons";

import Form from "./Form";

const Edit = () => {
  const history = useHistory();
  const { slug, id } = useParams();

  const { data: { quiz } = {}, isLoading } = useFetchQuestion(slug, id);

  const { refetch } = useShowQuiz(slug);

  const handleSubmit = async ({ formData }) => {
    try {
      await questionsApi.update(id, formData);
      refetch();
      history.push(routes.quiz.questions.replace(":slug", slug));
    } catch (error) {
      logger.error(error);
    }
  };

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container navbar={<NavBar backButtonVisible title={quiz.name} />}>
      <Form
        actionType="update"
        handleSubmit={handleSubmit}
        initialValues={quiz.question || {}}
      />
    </Container>
  );
};

export default Edit;
