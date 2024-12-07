import React, { useState, useRef } from "react";

import { Form as FormikForm, Formik, FieldArray } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { Option } from "components/commons";

import {
  MIN_OPTIONS_COUNT,
  MAX_OPTIONS_COUNT,
  QUESTION_BUILDER_FORM_INITIAL_VALUES,
  QUESTION_BUILDER_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Form = ({
  handleSubmit,
  initialValues = {},
  primaryButtonLabel,
  secondaryButtonLabel,
  isSecondaryButtonVisible = false,
}) => {
  const { t } = useTranslation();
  const submissionSource = useRef("primary");
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    initialValues?.answerIndex - 1 || 0
  );

  const [formInitialValues, setFormInitialValues] = useState(() =>
    isEmpty(initialValues)
      ? QUESTION_BUILDER_FORM_INITIAL_VALUES
      : initialValues
  );

  return (
    <div className="py-12">
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={QUESTION_BUILDER_FORM_VALIDATION_SCHEMA}
        onSubmit={(values, { resetForm }) =>
          handleSubmit({
            formData: { ...values, answerIndex: correctAnswerIndex + 1 },
            resetForm,
            submissionSource: submissionSource.current,
          })
        }
      >
        {({ values, touched, errors, submitForm }) => (
          <FormikForm>
            <Input
              nakedInput
              className="border-b font-bold  text-gray-700 focus:outline-none"
              name="question"
              placeholder={t("labels.enterQuestion")}
            />
            <div className="mt-4 flex flex-col gap-4">
              <FieldArray name="options">
                {({ push, remove }) => (
                  <>
                    {values.options.map((_, index) => (
                      <div key={index}>
                        <Option
                          number={index + 1}
                          style={correctAnswerIndex === index ? "correct" : ""}
                          deleteSelf={() => {
                            if (values.options.length > MIN_OPTIONS_COUNT) {
                              remove(index);
                            }
                          }}
                          isRemovable={
                            values.options.length > MIN_OPTIONS_COUNT
                          }
                          onSelectCorrect={() => setCorrectAnswerIndex(index)}
                        />
                        {Array.isArray(errors.options) &&
                          errors.options[index] &&
                          touched.options?.[index] && (
                            <p className="mt-1 text-xs text-red-700">
                              {errors.options[index]}{" "}
                            </p>
                          )}
                      </div>
                    ))}
                    {typeof errors.options === "string" && touched.options && (
                      <p className="mt-1 text-xs text-red-700">
                        {errors.options}
                      </p>
                    )}
                    {values.options.length < MAX_OPTIONS_COUNT && (
                      <Button
                        className="mt-2"
                        label={t("labels.addOption")}
                        style="link"
                        onClick={() => {
                          if (values.options.length < MAX_OPTIONS_COUNT) {
                            push("");
                          }
                        }}
                      />
                    )}
                  </>
                )}
              </FieldArray>
            </div>
            <div className="mt-12 flex gap-3">
              <Button
                label={primaryButtonLabel || t("labels.save")}
                type="submit"
                onClick={() => {
                  submissionSource.current = "primary";
                }}
              />
              {isSecondaryButtonVisible && (
                <Button
                  style="secondary"
                  label={
                    secondaryButtonLabel || t("labels.saveAndAddNewQuestion")
                  }
                  onClick={async () => {
                    submissionSource.current = "secondary";
                    await submitForm();
                    setCorrectAnswerIndex(0);
                    setFormInitialValues(QUESTION_BUILDER_FORM_INITIAL_VALUES);
                  }}
                />
              )}
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
