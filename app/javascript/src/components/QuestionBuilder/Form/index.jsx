import React, { useState } from "react";

import { Form as FormikForm, Formik, FieldArray } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import {
  MIN_OPTIONS_COUNT,
  MAX_OPTIONS_COUNT,
  QUESTION_BUILDER_FORM_INITIAL_VALUES,
  QUESTION_BUILDER_FORM_VALIDATION_SCHEMA,
} from "./constants";
import Option from "./Option";

const Form = ({ handleSubmit, initialValues = {}, actionType = "create" }) => {
  const { t } = useTranslation();
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    initialValues?.answerIndex - 1
  );

  return (
    <div className="py-12">
      <Formik
        validationSchema={QUESTION_BUILDER_FORM_VALIDATION_SCHEMA}
        initialValues={
          isEmpty(initialValues)
            ? QUESTION_BUILDER_FORM_INITIAL_VALUES
            : initialValues
        }
        onSubmit={(values, { resetForm }) =>
          handleSubmit(values, correctAnswerIndex, resetForm, true)
        }
      >
        {({ values, touched, errors, resetForm }) => (
          <FormikForm>
            <Input
              nakedInput
              className="border-b"
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
                          isSelected={correctAnswerIndex === index}
                          key={index}
                          number={index + 1}
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
                        {touched.options?.[index] &&
                          errors.options?.[index] && (
                            <p className="mt-0 text-xs leading-tight text-red-700">
                              {errors.options[index]}
                            </p>
                          )}
                      </div>
                    ))}
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
                type="submit"
                label={
                  actionType === "update"
                    ? t("labels.update")
                    : t("labels.save")
                }
              />
              {actionType === "create" && (
                <Button
                  label={t("labels.saveAndAddNewQuestion")}
                  style="secondary"
                  onClick={() => {
                    setCorrectAnswerIndex(0);
                    handleSubmit(values, correctAnswerIndex, resetForm, false);
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
