import React from "react";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useCloneQuizzes } from "src/hooks/reactQuery/useQuestionsApi";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import { Container, NavBar, PageLoader } from "components/commons";

import Form from "./Form";

const Clone = () => {
  const history = useHistory();
  const { slug, id } = useParams();

  const { data: { question = {}, quiz = "" } = {}, isLoading } =
    useCloneQuizzes(id);
  const { refetch } = useShowQuiz(slug);

  const handleSubmit = async ({ formData, resetForm, shouldRedirect }) => {
    try {
      await quizzesApi.addQuestion({
        ...formData,
        quizSlug: slug,
      });
      refetch();

      if (shouldRedirect) {
        history.push(routes.quiz.questions.replace(":slug", slug));
      } else {
        resetForm();
      }
    } catch (error) {
      logger.error(error);
    }
  };

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container navbar={<NavBar backButtonVisible title={quiz} />}>
      <Form handleSubmit={handleSubmit} initialValues={question || {}} />
    </Container>
  );
};

export default Clone;
