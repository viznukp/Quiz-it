import React from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import redirectionsApi from "apis/redirections";
import { ConfirmationModal } from "components/commons";

const Delete = ({ id, isActive, onCancel }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const handleDeleteRedirection = async () => {
    try {
      await redirectionsApi.destroy(id);
      queryClient.invalidateQueries("redirections");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isActive}
      primaryButtonAction={handleDeleteRedirection}
      primaryButtonStyle="danger"
      title={t("messages.warnings.confirmDeleteRedirection")}
      onClose={onCancel}
    />
  );
};

export default Delete;
