import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { FeatureToggle } from "components/commons";
import { useUpdateQuiz } from "hooks/reactQuery/useQuizzesApi";

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

  const { mutate: updateQuiz } = useUpdateQuiz();

  const handleRandomization = () => {
    updateQuiz(
      {
        slug,
        payload: {
          randomizeQuestions: isCheckedRandomQuestions,
          randomizeOptions: isCheckedRandomOptions,
        },
      },
      { onSuccess: () => queryClient.invalidateQueries("quiz") }
    );
  };

  return (
    <PanelWrapper
      currentPanel={CONFIGURATION_PANELS.questionsAndOptions}
      isPrimaryButtonDisabled={isConfigurationsNotDirty}
      isSecondaryButtonDisabled={isConfigurationsNotDirty}
      setActivePanel={setActivePanel}
      onSave={handleRandomization}
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
