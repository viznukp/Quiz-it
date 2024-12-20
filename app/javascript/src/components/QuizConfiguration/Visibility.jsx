import React, { useState } from "react";

import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import quizzesApi from "apis/quizzes";
import { FeatureToggle } from "components/commons";

import { CONFIGURATION_PANELS } from "./constants";

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
    <div>
      <div className="flex gap-2 text-gray-500">
        <Typography
          className="cursor-pointer hover:text-blue-500"
          style="body2"
          onClick={() => setActivePanel(CONFIGURATION_PANELS.dashboard)}
        >
          {t("labels.quizSettings")}
        </Typography>
        <Typography>/</Typography>
        <Typography
          className="cursor-pointer hover:text-blue-500"
          style="body2"
          onClick={() => setActivePanel(CONFIGURATION_PANELS.visibility)}
        >
          {t("configurationCards.visibility.title")}
        </Typography>
      </div>
      <Typography className="mb-6" style="h3">
        {t("configurationCards.visibility.title")}
      </Typography>
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
      <div className="mt-8 flex gap-2">
        <Button
          disabled={isChecked === initialState}
          label={t("labels.saveChanges")}
          onClick={handleAccessibilityUpdate}
        />
        <Button
          disabled={isChecked === initialState}
          label={t("labels.cancel")}
          style="secondary"
          onClick={() => setIsChecked(initialState)}
        />
      </div>
    </div>
  );
};

export default Visibility;
