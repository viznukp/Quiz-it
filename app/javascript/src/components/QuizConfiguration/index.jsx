import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";

import { Container, NavBar, ContentWrapper } from "components/commons";
import { QUIZ_TABS, QUIZ_TAB_IDS } from "components/constants";

import { CONFIGURATION_PANELS } from "./constants";
import Dashboard from "./Dashboard";
import EmailNotification from "./EmailNotification";
import QuizRandomizer from "./QuizRandomizer";
import QuizTime from "./QuizTime";
import Visibility from "./Visibility";

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
        {(() => {
          switch (activePanel.id) {
            case CONFIGURATION_PANELS.dashboard.id:
              return <Dashboard setActivePanel={setActivePanel} />;
            case CONFIGURATION_PANELS.visibility.id:
              return <Visibility setActivePanel={setActivePanel} {...quiz} />;
            case CONFIGURATION_PANELS.quizTiming.id:
              return <QuizTime setActivePanel={setActivePanel} {...quiz} />;
            case CONFIGURATION_PANELS.emailNotification.id:
              return (
                <EmailNotification setActivePanel={setActivePanel} {...quiz} />
              );
            case CONFIGURATION_PANELS.questionsAndOptions.id:
              return (
                <QuizRandomizer setActivePanel={setActivePanel} {...quiz} />
              );
            default:
              return null;
          }
        })()}
      </ContentWrapper>
    </Container>
  );
};

export default QuizConfiguration;
