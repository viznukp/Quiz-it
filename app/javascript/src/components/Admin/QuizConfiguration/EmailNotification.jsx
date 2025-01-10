import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { useUpdateQuiz } from "hooks/reactQuery/useQuizzesApi";

import { CONFIGURATION_PANELS } from "./constants";
import FeatureToggle from "./FeatureToggle";
import PanelWrapper from "./PanelWrapper";

const EmailNotification = ({ slug, emailNotification, setActivePanel }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(emailNotification);

  const { mutate: updateQuiz } = useUpdateQuiz();

  const handleEmailNotificationUpdate = () => {
    updateQuiz(
      { slug, payload: { emailNotification: isChecked } },
      { onSuccess: () => queryClient.invalidateQueries("quiz") }
    );
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
