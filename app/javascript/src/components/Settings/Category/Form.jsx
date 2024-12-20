import React, { useState } from "react";

import { Input } from "neetoui";
import { isEmpty, either, equals } from "ramda";
import { useTranslation } from "react-i18next";

import { ConfirmationModal } from "components/commons";

const Form = ({ submitAction, initialValue = "", isOpen, onClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(initialValue);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      primaryButtonAction={() => submitAction(inputValue)}
      primaryButtonLabel={t("labels.add")}
      title={t("labels.newCategory")}
      isPrimaryButtonDisabled={either(
        isEmpty,
        equals(initialValue)
      )(inputValue.trim())}
      onClose={() => {
        setInputValue(initialValue);
        onClose();
      }}
    >
      <Input
        label={t("labels.categoryName")}
        placeholder={t("placeHolders.enterCategoryName")}
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
    </ConfirmationModal>
  );
};

export default Form;
