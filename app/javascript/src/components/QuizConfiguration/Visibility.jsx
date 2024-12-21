import React, { useState } from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import quizzesApi from "apis/quizzes";
import { FeatureToggle } from "components/commons";

import { CONFIGURATION_PANELS } from "./constants";
import PanelWrapper from "./PanelWrapper";

const Visibility = ({ accessibility, status, slug, setActivePanel }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const initialState = accessibility === "discoverable";
  const [isChecked, setIsChecked] = useState(initialState);

  const handleAccessibilityUpdate = async () => {
    try {
      await quizzesApi.update(slug, {
        accessibility: isChecked ? "discoverable" : "hidden",
      });
      queryClient.invalidateQueries("quiz");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <PanelWrapper
      currentPanel={CONFIGURATION_PANELS.visibility}
      isPrimaryButtonDisabled={isChecked === initialState}
      isSecondaryButtonDisabled={isChecked === initialState}
      setActivePanel={setActivePanel}
      onCancel={() => setIsChecked(initialState)}
      onSave={handleAccessibilityUpdate}
    >
      {status === "draft" ? (
        <Typography className="flex max-w-sm justify-center rounded-lg bg-red-200 p-3 text-red-600 sm:max-w-md md:max-w-lg">
          {t("featureToggles.showQuiz.warning")}
        </Typography>
      ) : (
        <FeatureToggle
          checked={isChecked}
          description={t("featureToggles.showQuiz.description")}
          title={t("featureToggles.showQuiz.title")}
          onChange={() => setIsChecked(!isChecked)}
        />
      )}
    </PanelWrapper>
  );
};

export default Visibility;
