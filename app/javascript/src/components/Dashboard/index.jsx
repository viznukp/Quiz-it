import React from "react";

import { useTranslation } from "react-i18next";

import { Container, NavBar } from "components/commons";

import NewQuizPane from "./NewQuizPane";
import QuizList from "./QuizList";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Container
      navbar={
        <NavBar title={t("pageTitles.allQuizzes")}>
          <NewQuizPane />
        </NavBar>
      }
    >
      <QuizList />
    </Container>
  );
};
export default Dashboard;
