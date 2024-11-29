import React from "react";

import { Button } from "neetoui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFetchQuizzesPublic } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import { Container, NavBar, PageLoader } from "components/commons";

import Card from "./Card";

const PublicPage = () => {
  const history = useHistory();

  const { data = {}, isLoading } = useFetchQuizzesPublic();
  const { quizData: { organization, quizzes = [] } = {} } = data;

  if (isLoading) return <PageLoader className="h-64" />;

  return (
    <Container
      navbar={
        <NavBar title={organization}>
          <Button
            label="Login as admin"
            onClick={() => history.push(routes.login)}
          />
        </NavBar>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        {quizzes?.map(quiz => (
          <Card key={quiz.id} {...quiz} />
        ))}
      </div>
    </Container>
  );
};

export default PublicPage;
