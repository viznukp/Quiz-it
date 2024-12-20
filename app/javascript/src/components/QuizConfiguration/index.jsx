import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";

import { Container, NavBar, ContentWrapper } from "components/commons";
import { QUIZ_TABS, QUIZ_TAB_IDS } from "components/constants";

import { CONFIGURATION_PANELS } from "./constants";
import Dashboard from "./Dashboard";
import Visibility from "./Visibility";

const QuizConfiguration = () => {
  const { slug } = useParams();
  const [activePanel, setActivePanel] = useState("dashboard");

  const { data: { quiz } = {} } = useShowQuiz(slug);

  return (
    <Container>
      <NavBar
        backButtonVisible
        isTabsEnabled
        activeTab={QUIZ_TAB_IDS.configure}
        quizSlug={slug}
        tabs={QUIZ_TABS}
        title={quiz?.name}
      />
      <ContentWrapper>
        {activePanel === CONFIGURATION_PANELS.dashboard && (
          <Dashboard setActivePanel={setActivePanel} />
        )}
        {activePanel === CONFIGURATION_PANELS.visibility && (
          <Visibility setActivePanel={setActivePanel} {...quiz} />
        )}
      </ContentWrapper>
    </Container>
  );
};

export default QuizConfiguration;
