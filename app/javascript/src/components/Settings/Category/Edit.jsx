import React from "react";

import { useQueryClient } from "react-query";

import { useUpdateCategory } from "hooks/reactQuery/useCategoriesApi";

import Form from "./Form";

const Edit = ({ id, name, isOpen, onClose }) => {
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
      onClose={onClose}
    />
  );
};

export default Edit;
