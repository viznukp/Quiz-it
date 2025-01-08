import React, { useState } from "react";

import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { useUpdateQuiz } from "hooks/reactQuery/useQuizzesApi";
import {
  convertMinutesToHoursAndMinutes,
  convertHoursAndMinutesToMinutes,
} from "utils/time";

import { CONFIGURATION_PANELS } from "./constants";
import FeatureToggle from "./FeatureToggle";
import PanelWrapper from "./PanelWrapper";

const QuizTime = ({ timeLimit = 90, slug, setActivePanel }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const initialState = timeLimit > 0;
  const { hours, minutes } = convertMinutesToHoursAndMinutes(timeLimit);
  const [isChecked, setIsChecked] = useState(initialState);

  const { mutate: updateQuiz } = useUpdateQuiz();

  const handleQuizTimeUpdate = ({ hours, minutes }) => {
    updateQuiz(
      {
        slug,
        payload: {
          time_limit: isChecked
            ? convertHoursAndMinutesToMinutes(hours, minutes)
            : 0,
        },
      },
      { onSuccess: () => queryClient.invalidateQueries("quiz") }
    );
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
          onSave={() => handleQuizTimeUpdate(values)}
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
