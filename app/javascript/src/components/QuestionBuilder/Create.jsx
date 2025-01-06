import React from "react";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import routes from "src/routes";

import {
  Container,
  NavBar,
  PageLoader,
  ContentWrapper,
} from "components/commons";
import { useCreateQuestion } from "hooks/reactQuery/useQuestionsApi";
import { useShowQuiz } from "hooks/reactQuery/useQuizzesApi";

import Form from "./Form";

const Create = () => {
  const history = useHistory();
  const { slug } = useParams();

  const { data: { quiz } = {}, refetch, isLoading } = useShowQuiz(slug);

  const { mutate: createQuestion } = useCreateQuestion();

  const handleRedirection = (source, resetForm) => {
    refetch();
    if (source === "primary") {
      history.push(routes.admin.quiz.questions.replace(":slug", slug));
    } else {
      resetForm();
    }
  };

  const handleCreate = ({ formData, resetForm, submissionSource }) => {
    createQuestion(
      { questionData: formData, slug },
      { onSuccess: () => handleRedirection(submissionSource, resetForm) }
    );
  };

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container>
      <NavBar backButtonVisible title={quiz?.name} />
      <ContentWrapper>
        <Form isSecondaryButtonVisible handleSubmit={handleCreate} />
      </ContentWrapper>
    </Container>
  );
};

export default Create;
