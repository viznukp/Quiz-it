import React, { useState } from "react";

import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import quizzesApi from "apis/quizzes";
import { FeatureToggle } from "components/commons";
import {
  convertMinutesToHoursAndMinutes,
  convertHoursAndMinutesToMinutes,
} from "utils/time";

import { CONFIGURATION_PANELS } from "./constants";
import PanelWrapper from "./PanelWrapper";

const QuizTime = ({ timeLimit = 90, slug, setActivePanel }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const initialState = timeLimit > 0;
  const { hours, minutes } = convertMinutesToHoursAndMinutes(timeLimit);
  const [isChecked, setIsChecked] = useState(initialState);

  const handleAccessibilityUpdate = async formData => {
    try {
      await quizzesApi.update(slug, {
        time_limit: isChecked
          ? convertHoursAndMinutesToMinutes(formData.hours, formData.minutes)
          : 0,
      });
      queryClient.invalidateQueries("quiz");
    } catch (error) {
      logger.error(error);
    }
  };

  const isPrimaryButtonDisabled = (dirty, values) =>
    (initialState === true && isChecked === initialState && !dirty) ||
    (initialState === false &&
      (isChecked === initialState ||
        (values.hours === 0 && values.minutes === 0)));

  return (
    <Form
      formikProps={{
        initialValues: { hours, minutes },
        enableReinitialize: true,
      }}
    >
      {({ dirty, values, resetForm }) => (
        <PanelWrapper
          currentPanel={CONFIGURATION_PANELS.quizTiming}
          isPrimaryButtonDisabled={isPrimaryButtonDisabled(dirty, values)}
          isSecondaryButtonDisabled={isChecked === initialState && !dirty}
          setActivePanel={setActivePanel}
          onSave={() => handleAccessibilityUpdate(values)}
          onCancel={() => {
            resetForm();
            setIsChecked(initialState);
          }}
        >
          <FeatureToggle
            checked={isChecked}
            description={t("featureToggles.quizTiming.description")}
            title={t("featureToggles.quizTiming.title")}
            onChange={() => setIsChecked(!isChecked)}
          >
            {isChecked && (
              <div className="mt-4 flex gap-2">
                <Input label={t("labels.hours")} name="hours" type="number" />
                <Input
                  label={t("labels.minutes")}
                  name="minutes"
                  type="number"
                />
              </div>
            )}
          </FeatureToggle>
        </PanelWrapper>
      )}
    </Form>
  );
};

export default QuizTime;
