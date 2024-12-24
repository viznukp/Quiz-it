import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import quizzesApi from "apis/quizzes";
import { FeatureToggle } from "components/commons";

import { CONFIGURATION_PANELS } from "./constants";
import PanelWrapper from "./PanelWrapper";

const QuizRandomizer = ({
  slug,
  randomizeQuestions = true,
  randomizeOptions = false,
  setActivePanel,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isCheckedRandomQuestions, setIsCheckedRandomQuestions] =
    useState(randomizeQuestions);

  const [isCheckedRandomOptions, setIsCheckedRandomOptions] =
    useState(randomizeOptions);

  const isConfigurationsNotDirty =
    isCheckedRandomQuestions === randomizeQuestions &&
    isCheckedRandomOptions === randomizeOptions;

  const handleEmailNotificationUpdate = async () => {
    try {
      await quizzesApi.update(slug, {
        randomizeQuestions: isCheckedRandomQuestions,
        randomizeOptions: isCheckedRandomOptions,
      });
      queryClient.invalidateQueries("quiz");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <PanelWrapper
      currentPanel={CONFIGURATION_PANELS.questionsAndOptions}
      isPrimaryButtonDisabled={isConfigurationsNotDirty}
      isSecondaryButtonDisabled={isConfigurationsNotDirty}
      setActivePanel={setActivePanel}
      onSave={handleEmailNotificationUpdate}
      onCancel={() => {
        setIsCheckedRandomQuestions(randomizeQuestions);
        setIsCheckedRandomOptions(randomizeOptions);
      }}
    >
      <FeatureToggle
        checked={isCheckedRandomQuestions}
        description={t("featureToggles.randomizeQuestions.description")}
        title={t("featureToggles.randomizeQuestions.title")}
        onChange={() => setIsCheckedRandomQuestions(!isCheckedRandomQuestions)}
      />
      <FeatureToggle
        checked={isCheckedRandomOptions}
        description={t("featureToggles.randomizeChoices.description")}
        title={t("featureToggles.randomizeChoices.title")}
        onChange={() => setIsCheckedRandomOptions(!isCheckedRandomOptions)}
      />
    </PanelWrapper>
  );
};

export default QuizRandomizer;
