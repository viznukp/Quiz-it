import React, { useState } from "react";

import { Form as FormikForm, Formik, FieldArray } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useShowQuiz } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import { Container, NavBar, PageLoader } from "components/commons";

import {
  MIN_OPTIONS_COUNT,
  MAX_OPTIONS_COUNT,
  QUESTION_BUILDER_FORM_INITIAL_VALUES,
  QUESTION_BUILDER_FORM_VALIDATION_SCHEMA,
} from "./constants";
import Option from "./Option";

const Create = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { slug } = useParams();
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const { data: { quiz } = {}, isLoading, refetch } = useShowQuiz(slug);

  const handleSubmit = async (formData, resetForm, shouldRedirect) => {
    try {
      await quizzesApi.addQuestion({
        ...formData,
        answerIndex: correctAnswerIndex + 1,
        quizSlug: slug,
      });
      refetch();

      if (shouldRedirect) {
        history.push(routes.quiz.questions.replace(":slug", slug));
      } else {
        resetForm();
        setCorrectAnswerIndex(0);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container navbar={<NavBar backButtonVisible title={quiz.name} />}>
      <div className="py-12">
        <Formik
          initialValues={QUESTION_BUILDER_FORM_INITIAL_VALUES}
          validationSchema={QUESTION_BUILDER_FORM_VALIDATION_SCHEMA}
          onSubmit={(values, { resetForm }) =>
            handleSubmit(values, resetForm, true)
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
                <Button label={t("labels.save")} type="submit" />
                <Button
                  label={t("labels.saveAndAddNewQuestion")}
                  style="secondary"
                  onClick={() => handleSubmit(values, resetForm, false)}
                />
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Create;
