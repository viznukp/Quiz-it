import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";

import { Container, NavBar, ContentWrapper } from "components/commons";
import { QUIZ_TABS, QUIZ_TAB_IDS } from "components/constants";

import { CONFIGURATION_PANELS } from "./constants";

const QuizConfiguration = () => {
  const { slug } = useParams();
  const [activePanel, setActivePanel] = useState(
    CONFIGURATION_PANELS.dashboard
  );

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
        {activePanel.panel({ ...quiz, setActivePanel })}
      </ContentWrapper>
    </Container>
  );
};

export default QuizConfiguration;
