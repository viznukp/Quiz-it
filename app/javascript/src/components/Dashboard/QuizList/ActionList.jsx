import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button, Modal, Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import quizzesApi from "apis/quizzes";
import { QUIZ_STATUSES } from "components/constants";

const ActionList = ({ slug, quizName, status, reloadQuizzes }) => {
  const { t } = useTranslation();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const statusUpdateButtonLabel =
    status === QUIZ_STATUSES.PUBLISHED.STATUS
      ? t("labels.unpublish")
      : t("labels.publish");

  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  const handleUpdate = async () => {
    const updatedStatus =
      status === QUIZ_STATUSES.PUBLISHED.STATUS
        ? QUIZ_STATUSES.DRAFT.STATUS
        : QUIZ_STATUSES.PUBLISHED.STATUS;

    try {
      await quizzesApi.update(slug, {
        status: updatedStatus,
      });
      reloadQuizzes();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await quizzesApi.destroy(slug);
      reloadQuizzes();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClone = async () => {
    try {
      await quizzesApi.clone(slug);
      reloadQuizzes();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
        <div className="flex flex-col">
          <Button
            label={statusUpdateButtonLabel}
            style="text"
            onClick={handleUpdate}
          />
          <Button
            label={t("labels.clone")}
            style="text"
            onClick={handleClone}
          />
          <Button
            label={t("labels.delete")}
            style="danger-text"
            onClick={() => setIsConfirmationModalOpen(true)}
          />
        </div>
      </Dropdown>
      <Modal isOpen={isConfirmationModalOpen} onClose={closeConfirmationModal}>
        <div className=" mt-6 flex flex-col gap-4 p-4">
          <Typography style="h4" weight="bold">
            {t("labels.confirmDeleteTitle")}
          </Typography>
          <Typography>
            <Trans
              components={{ strong: <strong /> }}
              i18nKey="messages.warnings.beforeDelete"
              values={{ entity: quizName }}
            />
          </Typography>
          <Typography>{t("messages.warnings.confirmDelete")}</Typography>
          <div className="flex gap-3">
            <Button
              label={t("labels.confirmDelete")}
              style="danger"
              onClick={handleDelete}
            />
            <Button
              label={t("labels.cancel")}
              style="secondary"
              onClick={closeConfirmationModal}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ActionList;
