import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import quizzesApi from "apis/quizzes";
import { FeatureToggle } from "components/commons";

import { CONFIGURATION_PANELS } from "./constants";
import PanelWrapper from "./PanelWrapper";

const EmailNotification = ({ slug, emailNotification, setActivePanel }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(emailNotification);

  const handleEmailNotificationUpdate = async () => {
    try {
      await quizzesApi.update(slug, {
        emailNotification: isChecked,
      });
      queryClient.invalidateQueries("quiz");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <PanelWrapper
      currentPanel={CONFIGURATION_PANELS.emailNotification}
      isPrimaryButtonDisabled={isChecked === emailNotification}
      isSecondaryButtonDisabled={isChecked === emailNotification}
      setActivePanel={setActivePanel}
      onCancel={() => setIsChecked(emailNotification)}
      onSave={handleEmailNotificationUpdate}
    >
      <FeatureToggle
        checked={isChecked}
        description={t("featureToggles.emailNotification.description")}
        title={t("featureToggles.emailNotification.title")}
        onChange={() => setIsChecked(!isChecked)}
      />
    </PanelWrapper>
  );
};

export default EmailNotification;
