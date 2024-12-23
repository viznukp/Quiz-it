import React from "react";

import { Settings as SettingsIcon, Clock, Notification, Eye } from "neetoicons";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Card from "./Card";
import { CONFIGURATION_PANELS } from "./constants";

const Dashboard = ({ setActivePanel }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography className="mb-6" style="h3">
        {t("labels.quizSettings")}
      </Typography>
      <div className="grid grid-cols-3 gap-3">
        <Card
          description={t("configurationCards.visibility.description")}
          icon={<Eye />}
          title={t("configurationCards.visibility.title")}
          onClick={() => setActivePanel(CONFIGURATION_PANELS.visibility)}
        />
        <Card
          description={t("configurationCards.timing.description")}
          icon={<Clock />}
          title={t("configurationCards.timing.title")}
          onClick={() => setActivePanel(CONFIGURATION_PANELS.quizTiming)}
        />
        <Card
          description={t("configurationCards.questionsAndOptions.description")}
          icon={<SettingsIcon />}
          title={t("configurationCards.questionsAndOptions.title")}
        />
        <Card
          description={t("configurationCards.emailNotifications.description")}
          icon={<Notification />}
          title={t("configurationCards.emailNotifications.title")}
          onClick={() => setActivePanel(CONFIGURATION_PANELS.emailNotification)}
        />
      </div>
    </>
  );
};

export default Dashboard;
