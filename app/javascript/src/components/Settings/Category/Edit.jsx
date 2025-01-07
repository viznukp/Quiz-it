import React from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { useUpdateCategory } from "hooks/reactQuery/useCategoriesApi";

import Form from "./Form";

const Edit = ({ id, name, isOpen, onClose }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: updateCategory } = useUpdateCategory();

  const handleCategoryUpdate = inputValue => {
    updateCategory(
      { id, payload: { name: inputValue.trim() } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("categories");
          queryClient.invalidateQueries("quizzes");
        },
      }
    );
  };

  return (
    <Form
      initialValue={name}
      isOpen={isOpen}
      submitAction={handleCategoryUpdate}
      title={t("labels.editCategory")}
      onClose={onClose}
    />
  );
};

export default Edit;
