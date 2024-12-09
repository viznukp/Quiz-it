import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button, Typography, Input } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import quizzesApi from "apis/quizzes";
import { QUIZ_STATUSES } from "components/constants";

import ActionModal from "./ActionModal";

const ActionList = ({ slug, quizName, status, reloadQuizzes }) => {
  const { t } = useTranslation();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [newQuizName, setNewQuizName] = useState(quizName);

  const statusUpdateButtonLabel =
    status === QUIZ_STATUSES.PUBLISHED.STATUS
      ? t("labels.unpublish")
      : t("labels.publish");

  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);
  const closeNewQuizModal = () => setIsCloneModalOpen(false);

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
      await quizzesApi.clone(slug, newQuizName);
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
            onClick={() => setIsCloneModalOpen(true)}
          />
          <Button
            label={t("labels.delete")}
            style="danger-text"
            onClick={() => setIsConfirmationModalOpen(true)}
          />
        </div>
      </Dropdown>
      <ActionModal
        isOpen={isCloneModalOpen}
        isPrimaryButtonDisabled={quizName === newQuizName}
        primaryButtonAction={handleClone}
        primaryButtonLabel={t("labels.save")}
        primaryButtonStyle="danger"
        title={t("labels.newNameForQuiz")}
        onClose={closeNewQuizModal}
      >
        <Input
          value={newQuizName}
          onChange={event => setNewQuizName(event.target.value)}
        />
      </ActionModal>
      <ActionModal
        isOpen={isConfirmationModalOpen}
        primaryButtonAction={handleDelete}
        primaryButtonLabel={t("labels.confirmDelete")}
        primaryButtonStyle="danger"
        title={t("labels.confirmDeleteTitle")}
        onClose={closeConfirmationModal}
      >
        <Typography>
          <Trans
            components={{ strong: <strong /> }}
            i18nKey="messages.warnings.beforeDelete"
            values={{ entity: quizName }}
          />
        </Typography>
        <Typography className="mt-4">
          {t("messages.warnings.confirmDelete", { entity: "It" })}
        </Typography>
      </ActionModal>
    </>
  );
};
export default ActionList;
