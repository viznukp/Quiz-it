import React from "react";

import classNames from "classnames";
import { Form as FormikForm, Formik, FieldArray } from "formik";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { Option } from "components/commons";

import { QUESTION_STATUS_MESSAGES, STATUSES } from "./constants";

const ShowAnswer = ({
  questionCount,
  question,
  options,
  correctAnswerId,
  userSelectionId,
}) => {
  const { t } = useTranslation();

  const getQuestionStatus = () => {
    if (!userSelectionId) return STATUSES.unanswered;

    if (correctAnswerId === userSelectionId) return STATUSES.correct;

    return STATUSES.wrong;
  };

  const handleOptionStyle = id => {
    if (id === correctAnswerId) return "correct";

    if (id === userSelectionId && id !== correctAnswerId) {
      return "wrong";
    }

    return "";
  };

  const handleOptionStatusLabel = optionId => {
    const optionStatus = handleOptionStyle(optionId);
    if (optionStatus === "correct") return t("labels.correctAnswer");

    if (optionStatus === "wrong") return t("labels.yourAnswer");

    return "";
  };

  return (
    <div className="mt-4">
      <Typography style="h5">
        {t("labels.nthQuestion", { count: questionCount })}{" "}
      </Typography>
      <Typography style="h3">{question} </Typography>
      <Formik initialValues={{ options: options.map(entry => entry.option) }}>
        {() => (
          <FormikForm>
            <div className="mt-4 flex flex-col gap-4">
              <FieldArray name="options">
                {() =>
                  options?.map((option, index) => (
                    <Option
                      isDisabled
                      isStatusLabelEnabled
                      key={option.id}
                      number={index + 1}
                      statusLabel={handleOptionStatusLabel(option.id)}
                      statusLabelStyle={handleOptionStyle(option.id)}
                      style={handleOptionStyle(option.id)}
                    />
                  ))
                }
              </FieldArray>
            </div>
          </FormikForm>
        )}
      </Formik>
      <div
        className={classNames("mt-2 rounded-md p-2", [
          QUESTION_STATUS_MESSAGES[getQuestionStatus()].style,
        ])}
      >
        <Typography>
          {QUESTION_STATUS_MESSAGES[getQuestionStatus()].message}
        </Typography>
      </div>
    </div>
  );
};

export default ShowAnswer;
