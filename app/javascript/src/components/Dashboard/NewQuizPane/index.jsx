import React, { useState } from "react";

import { Form, Formik } from "formik";
import { Pane, Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useFetchQuizzes } from "src/hooks/reactQuery/useQuizzesApi";

import quizzesApi from "apis/quizzes";

import { CREATE_NEW_QUIZ__FORM_VALIDATION_SCHEMA } from "./constants";

const NewQuizPane = () => {
  const { t } = useTranslation();
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const closePane = () => setIsPaneOpen(false);

  const { refetch: refetchQuizzes } = useFetchQuizzes();

  const handleCreateNewQuiz = async formData => {
    try {
      await quizzesApi.create(formData);
      closePane();
      refetchQuizzes();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <Button
        label={t("labels.addNewQuiz")}
        onClick={() => setIsPaneOpen(!isPaneOpen)}
      />
      <Pane isOpen={isPaneOpen} onClose={closePane}>
        <div className="flex h-full flex-col px-4 pb-4 pt-12">
          <Typography style="h2">{t("labels.addNewQuiz")}</Typography>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={CREATE_NEW_QUIZ__FORM_VALIDATION_SCHEMA}
            onSubmit={handleCreateNewQuiz}
          >
            {({ isSubmitting, dirty }) => (
              <Form className="flex flex-1 flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <Input
                    required
                    className="mt-4"
                    label={t("labels.name")}
                    name="name"
                    placeHolder={t("labels.exampleQuizName")}
                  />
                  <Input
                    required
                    label={t("labels.category")}
                    name="category"
                    placeHolder={t("labels.exampleCategoryName")}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    disabled={isSubmitting || !dirty}
                    label={t("labels.save")}
                    loading={isSubmitting}
                    type="submit"
                  />
                  <Button
                    label={t("labels.cancel")}
                    style="secondary"
                    onClick={closePane}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Pane>
    </>
  );
};

export default NewQuizPane;
