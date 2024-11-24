import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { Container, NavBar } from "components/commons";

import NewQuizPane from "./NewQuizPane";
import QuizList from "./QuizList";

const Dashboard = () => {
  const { t } = useTranslation();
  const [isQuizReloadRequired, setIsQuizReloadRequired] = useState(false);

  return (
    <Container
      navbar={
        <NavBar title={t("pageTitles.allQuizzes")}>
          <NewQuizPane
            reloadQuizzes={() => setIsQuizReloadRequired(!isQuizReloadRequired)}
          />
        </NavBar>
      }
    >
      <QuizList isQuizReloadRequired={isQuizReloadRequired} />
    </Container>
  );
};
export default Dashboard;
