import React from "react";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useCloneQuestion } from "src/hooks/reactQuery/useQuestionsApi";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import { Container, NavBar, PageLoader } from "components/commons";

import Form from "./Form";

const Clone = () => {
  const history = useHistory();
  const { slug, id } = useParams();

  const { data: { question = {}, quiz = "" } = {}, isLoading } =
    useCloneQuestion(id);
  const { refetch } = useShowQuiz(slug);

  const handleSubmit = async ({ formData, submissionSource }) => {
    try {
      await quizzesApi.addQuestion({
        ...formData,
        quizSlug: slug,
      });
      refetch();

      if (submissionSource === "primary") {
        history.push(routes.quiz.questions.replace(":slug", slug));
      } else {
        history.replace(routes.quiz.question.new.replace(":slug", slug));
      }
    } catch (error) {
      logger.error(error);
    }
  };

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container navbar={<NavBar backButtonVisible title={quiz} />}>
      <Form
        isSecondaryButtonVisible
        handleSubmit={handleSubmit}
        initialValues={question || {}}
      />
    </Container>
  );
};

export default Clone;
