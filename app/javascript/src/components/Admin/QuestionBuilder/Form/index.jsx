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
import { getFormattedData } from "./utils";

const Form = ({
  handleSubmit,
  initialValues = {},
  primaryButtonLabel,
  secondaryButtonLabel,
  isSecondaryButtonVisible = false,
}) => {
  const { t } = useTranslation();
  const submissionSource = useRef("primary");
  const initialAnswerIndex = initialValues?.answerId - 1 || 0;
  const [selectedOptionIndex, setSelectedOptionIndex] =
    useState(initialAnswerIndex);

  const initialValuesFormattedForFormikForm = {
    ...initialValues,
    options: initialValues?.options?.map(entry => entry.option),
  };

  const [formInitialValues, setFormInitialValues] = useState(() =>
    isEmpty(initialValues)
      ? QUESTION_BUILDER_FORM_INITIAL_VALUES
      : initialValuesFormattedForFormikForm
  );

  const isSubmitDisabled = (isSubmitting, isDirty) =>
    isSubmitting ||
    (!isDirty &&
      (isEmpty(initialValues)
        ? !isDirty
        : selectedOptionIndex === initialAnswerIndex));

  return (
    <div className="py-12">
      <Formik
        initialValues={formInitialValues}
        validationSchema={QUESTION_BUILDER_FORM_VALIDATION_SCHEMA}
        onSubmit={(values, { resetForm }) =>
          handleSubmit({
            formData: getFormattedData(values, selectedOptionIndex + 1),
            resetForm,
            submissionSource: submissionSource.current,
          })
        }
      >
        {({ values, touched, errors, submitForm, isSubmitting, dirty }) => (
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
                          style={selectedOptionIndex === index ? "correct" : ""}
                          deleteSelf={() => {
                            if (values.options.length > MIN_OPTIONS_COUNT) {
                              remove(index);
                            }
                          }}
                          isRemovable={
                            values.options.length > MIN_OPTIONS_COUNT
                          }
                          onSelectCorrect={() => setSelectedOptionIndex(index)}
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
                disabled={isSubmitDisabled(isSubmitting, dirty)}
                label={primaryButtonLabel || t("labels.save")}
                type="submit"
                onClick={() => {
                  submissionSource.current = "primary";
                }}
              />
              {isSecondaryButtonVisible && (
                <Button
                  disabled={isSubmitDisabled(isSubmitting, dirty)}
                  style="secondary"
                  label={
                    secondaryButtonLabel || t("labels.saveAndAddNewQuestion")
                  }
                  onClick={async () => {
                    submissionSource.current = "secondary";
                    await submitForm();
                    setSelectedOptionIndex(0);
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
