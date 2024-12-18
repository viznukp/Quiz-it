import React from "react";

import { Modal, Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  primaryButtonLabel,
  primaryButtonAction,
  isPrimaryButtonDisabled = false,
  primaryButtonStyle = "primary",
  children,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" mt-4 flex flex-col gap-4 p-4">
        <Typography style="h4" weight="bold">
          {title}
        </Typography>
        {children}
        <div className="flex gap-3">
          <Button
            disabled={isPrimaryButtonDisabled}
            label={primaryButtonLabel}
            style={primaryButtonStyle}
            onClick={() => {
              primaryButtonAction();
              onClose();
            }}
          />
          <Button
            label={t("labels.cancel")}
            style="secondary"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
