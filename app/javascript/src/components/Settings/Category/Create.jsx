import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import categoriesApi from "apis/categories";

import Form from "./Form";

const Create = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryCreate = async inputValue => {
    try {
      await categoriesApi.create({ name: inputValue.trim() });
      queryClient.invalidateQueries("categories");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <Button
        className="text-blue-500"
        icon={Plus}
        iconPosition="left"
        label={t("settings.categories.addNewCategory")}
        style="text"
        onClick={() => setIsModalOpen(true)}
      />
      <Form
        isOpen={isModalOpen}
        submitAction={handleCategoryCreate}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Create;
