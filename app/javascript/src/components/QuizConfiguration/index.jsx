import React from "react";

import { Settings as SettingsIcon, Clock, Notification, Eye } from "neetoicons";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";

import { Container, NavBar, ContentWrapper } from "components/commons";
import { QUIZ_TABS, QUIZ_TAB_IDS } from "components/constants";

import Card from "./Card";

const QuizConfiguration = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
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
        <Typography className="mb-6" style="h3">
          {t("labels.quizSettings")}
        </Typography>
        <div className="grid grid-cols-3 gap-3">
          <Card
            description={t("configurationCards.visibility.description")}
            icon={<Eye />}
            title={t("configurationCards.visibility.title")}
          />
          <Card
            description={t("configurationCards.timing.description")}
            icon={<Clock />}
            title={t("configurationCards.timing.title")}
          />
          <Card
            icon={<SettingsIcon />}
            title={t("configurationCards.questionsAndOptions.title")}
            description={t(
              "configurationCards.questionsAndOptions.description"
            )}
          />
          <Card
            description={t("configurationCards.emailNotification.description")}
            icon={<Notification />}
            title={t("configurationCards.emailNotification.title")}
          />
        </div>
      </ContentWrapper>
    </Container>
  );
};

export default QuizConfiguration;
