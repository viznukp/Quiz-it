import React, { useState } from "react";

import { Form as FormikForm, Formik, FieldArray } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import quizzesApi from "apis/quizzes";

import {
  MIN_OPTIONS_COUNT,
  MAX_OPTIONS_COUNT,
  QUESTION_BUILDER_FORM_INITIAL_VALUES,
  QUESTION_BUILDER_FORM_VALIDATION_SCHEMA,
} from "./constants";
import Option from "./Option";

const Form = ({ slug }) => {
  const { t } = useTranslation();
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const handleSubmit = async formData => {
    // console.log({...formData, answerIndex: correctAnswerIndex, quizSlug: slug });
    try {
      await quizzesApi.addQuestion({
        ...formData,
        answerIndex: correctAnswerIndex + 1,
        quizSlug: slug,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="py-12">
      <Formik
        initialValues={QUESTION_BUILDER_FORM_INITIAL_VALUES}
        validationSchema={QUESTION_BUILDER_FORM_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors }) => (
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
              <Button label={t("labels.save")} type="submit" />
              <Button
                label={t("labels.saveAndAddNewQuestion")}
                style="secondary"
              />
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
