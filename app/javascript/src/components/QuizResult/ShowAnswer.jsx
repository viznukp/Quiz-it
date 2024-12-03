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
  correctAnswerIndex,
  userSelectionIndex,
}) => {
  const { t } = useTranslation();

  const getQuestionStatus = () => {
    if (!userSelectionIndex) return STATUSES.unanswered;

    if (correctAnswerIndex === userSelectionIndex) return STATUSES.correct;

    return STATUSES.wrong;
  };

  const handleOptionStyle = option => {
    if (option === correctAnswerIndex) return "correct";

    if (option === userSelectionIndex && option !== correctAnswerIndex) {
      return "wrong";
    }

    return "";
  };

  const handleOptionStatusLabel = option => {
    const optionStatus = handleOptionStyle(option);
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
      <Formik initialValues={{ options }}>
        {({ values }) => (
          <FormikForm>
            <div className="mt-4 flex flex-col gap-4">
              <FieldArray name="options">
                {() =>
                  values?.options?.map((_, index) => {
                    const optionNumber = index + 1;

                    return (
                      <Option
                        isDisabled
                        isStatusLabelEnabled
                        key={index}
                        number={optionNumber}
                        statusLabel={handleOptionStatusLabel(optionNumber)}
                        statusLabelStyle={handleOptionStyle(optionNumber)}
                        style={handleOptionStyle(optionNumber)}
                      />
                    );
                  })
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
