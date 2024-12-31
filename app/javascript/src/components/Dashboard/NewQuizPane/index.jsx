import React, { useState } from "react";

import { Pane, Button, Typography } from "neetoui";
import { Input, Form } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { CategorySelector } from "components/commons";
import { useCreateQuiz } from "hooks/reactQuery/useQuizzesApi";

import {
  CREATE_NEW_QUIZ_FORM_VALIDATION_SCHEMA,
  NEW_QUIZ_FORM_INITIAL_VALUES,
} from "./constants";

const NewQuizPane = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const closePane = () => setIsPaneOpen(false);

  const { mutate: createQuiz } = useCreateQuiz();

  const handleCreate = ({ name, category }) => {
    createQuiz(
      { name, categoryId: category.value.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("quizzes");
          queryClient.invalidateQueries("categories");
          closePane();
        },
      }
    );
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
          <Form
            className="flex flex-1 flex-col justify-between"
            formikProps={{
              initialValues: NEW_QUIZ_FORM_INITIAL_VALUES,
              validationSchema: CREATE_NEW_QUIZ_FORM_VALIDATION_SCHEMA,
              onSubmit: handleCreate,
            }}
          >
            {({ isSubmitting, dirty }) => (
              <>
                <div className="flex flex-col gap-3">
                  <Input
                    required
                    className="mt-4"
                    label={t("labels.name")}
                    name="name"
                    placeholder={t("labels.exampleQuizName")}
                  />
                  <CategorySelector />
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
              </>
            )}
          </Form>
        </div>
      </Pane>
    </>
  );
};

export default NewQuizPane;
