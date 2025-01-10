import React from "react";

import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { ConfirmationModal } from "components/Admin/commons";
import { useDestroyRedirection } from "hooks/reactQuery/useRedirectionsApi";

const Delete = ({ id, isActive, onCancel }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: deleteRedirection } = useDestroyRedirection();

  const handleDeleteRedirection = () => {
    deleteRedirection(id, {
      onSuccess: () => queryClient.invalidateQueries("redirections"),
    });
  };

  return (
    <ConfirmationModal
      isOpen={isActive}
      primaryButtonAction={handleDeleteRedirection}
      primaryButtonStyle="danger"
      title={t("messages.warnings.confirmDeleteEntity", {
        entity: t("labels.redirectionLower"),
      })}
      onClose={onCancel}
    />
  );
};

export default Delete;
