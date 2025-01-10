import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";

import Form from "./Form";

const Create = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: createCategory } = useCreateCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = name => {
    createCategory(
      { name: name.trim() },
      { onSuccess: () => queryClient.invalidateQueries("categories") }
    );
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
        submitAction={handleCreate}
        title={t("labels.newCategory")}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Create;
