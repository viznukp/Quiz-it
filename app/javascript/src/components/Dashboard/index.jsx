import React from "react";

import { useTranslation } from "react-i18next";

import { Container, NavBar } from "components/commons";

import QuizList from "./QuizList";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Container
      navbar={<NavBar backButtonVisible title={t("pageTitles.allQuizzes")} />}
    >
      <QuizList />
    </Container>
  );
};
export default Dashboard;
