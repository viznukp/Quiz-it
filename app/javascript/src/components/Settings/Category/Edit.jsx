import React from "react";

import { useQueryClient } from "react-query";

import categoriesApi from "apis/categories";

import Form from "./Form";

const Edit = ({ id, name, isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const handleCategoryUpdate = async inputValue => {
    try {
      await categoriesApi.update(id, { name: inputValue.trim() });
      queryClient.invalidateQueries("categories");
      queryClient.invalidateQueries("quizzes");
    } catch (error) {
      logger.error(error);
    }
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
