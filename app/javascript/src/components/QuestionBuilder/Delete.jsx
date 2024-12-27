import React from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import questionsApi from "apis/questions";
import { ConfirmationModal } from "components/commons";

const Delete = ({ id, isActive, onCancel }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const handleQuestionDelete = async () => {
    try {
      await questionsApi.destroy(id);
      queryClient.invalidateQueries("quiz");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isActive}
      primaryButtonAction={handleQuestionDelete}
      primaryButtonStyle="danger"
      title={t("messages.warnings.confirmDeleteEntity", {
        entity: t("labels.questionLower"),
      })}
      onClose={onCancel}
    />
  );
};

export default Delete;
