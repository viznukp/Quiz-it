import React from "react";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import { Container, NavBar, PageLoader } from "components/commons";

import Form from "./Form";

const Create = () => {
  const history = useHistory();
  const { slug } = useParams();

  const { data: { quiz } = {}, isLoading, refetch } = useShowQuiz(slug);

  const handleSubmit = async (
    formData,
    correctAnswerIndex,
    resetForm,
    shouldRedirect
  ) => {
    try {
      await quizzesApi.addQuestion({
        ...formData,
        answerIndex: correctAnswerIndex + 1,
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
    <Container navbar={<NavBar backButtonVisible title={quiz?.name} />}>
      <Form handleSubmit={handleSubmit} />
    </Container>
  );
};

export default Create;
