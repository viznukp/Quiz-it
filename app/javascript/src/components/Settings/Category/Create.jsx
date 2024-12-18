import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Input, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";
import { ConfirmationModal } from "components/commons";

const Create = ({ refetchCategories }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleCategoryCreate = async () => {
    try {
      await categoriesApi.create({ name: inputValue.trim() });
      refetchCategories();
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
      <ConfirmationModal
        isOpen={isModalOpen}
        isPrimaryButtonDisabled={isEmpty(inputValue.trim())}
        primaryButtonAction={handleCategoryCreate}
        primaryButtonLabel={t("labels.add")}
        title={t("labels.newCategory")}
        onClose={() => setIsModalOpen(false)}
      >
        <Input
          label={t("labels.categoryName")}
          placeholder={t("placeHolders.enterCategoryName")}
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      </ConfirmationModal>
    </>
  );
};

export default Create;
