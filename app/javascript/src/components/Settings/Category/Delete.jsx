import React from "react";

import { Warning } from "neetoicons";
import { Typography } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useTranslation, Trans } from "react-i18next";
import { useQueryClient } from "react-query";

import categoriesApi from "apis/categories";
import { ConfirmationModal, CategorySelector } from "components/commons";

const Delete = ({ id, name, quizCount, categoryCount, isOpen, onClose }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const handleCategoryDelete = async formData => {
    try {
      await categoriesApi.destroy(id, {
        replacementCategoryId: formData?.category?.value.id,
      });
      queryClient.invalidateQueries("categories");
      queryClient.invalidateQueries("quizzes");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      <NeetoUIForm
        className="mt-4 flex flex-col gap-3"
        formikProps={{
          initialValues: {
            category: null,
          },
          onSubmit: handleCategoryDelete,
        }}
      >
        {({ isSubmitting, dirty, submitForm }) => (
          <ConfirmationModal
            isOpen={isOpen}
            primaryButtonAction={submitForm}
            primaryButtonLabel={t("labels.proceed")}
            primaryButtonStyle="danger"
            title={t("messages.warnings.deleteCategory")}
            isPrimaryButtonDisabled={
              ((isSubmitting || !dirty) &&
                categoryCount > 1 &&
                quizCount > 0) ||
              (name === "General" && categoryCount === 1)
            }
            onClose={onClose}
          >
            <Typography>
              <Trans
                components={{ strong: <strong /> }}
                i18nKey="messages.warnings.deleteCategoryDescription"
                values={{ category: name }}
              />
            </Typography>
            {quizCount > 0 && (
              <div className="flex items-center gap-3 rounded-xl bg-red-200 p-4 text-red-600">
                <Warning className="h-16 w-16" />
                <Typography>
                  {name === "General" && categoryCount === 1 ? (
                    t("messages.warnings.cannotDeleteGeneralCategory")
                  ) : (
                    <Trans
                      components={{ strong: <strong /> }}
                      i18nKey="messages.warnings.moveToNewCategory"
                      values={{
                        count: categoryCount,
                        category: name,
                        entity: t("labels.quiz", { count: quizCount }),
                        entityDescription: t("labels.thisQuiz", {
                          count: quizCount,
                        }),
                      }}
                    />
                  )}
                </Typography>
              </div>
            )}
            {categoryCount > 1 && quizCount > 0 && (
              <CategorySelector
                excludedCategoryIds={[id]}
                label={t("messages.warnings.selectCategoryToMove")}
              />
            )}
          </ConfirmationModal>
        )}
      </NeetoUIForm>
    </div>
  );
};

export default Delete;
