import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button, Typography, Input } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import { useQueryClient } from "react-query";

import { ConfirmationModal } from "components/commons";
import { QUIZ_STATUSES } from "components/constants";
import {
  useUpdateQuiz,
  useDeleteQuiz,
  useCloneQuiz,
} from "hooks/reactQuery/useQuizzesApi";

const ActionList = ({ slug, quizName, status }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: updateQuiz } = useUpdateQuiz();
  const { mutate: deleteQuiz } = useDeleteQuiz();
  const { mutate: cloneQuiz } = useCloneQuiz();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [newQuizName, setNewQuizName] = useState(quizName);

  const statusUpdateButtonLabel =
    status === QUIZ_STATUSES.PUBLISHED.STATUS
      ? t("labels.unpublish")
      : t("labels.publish");

  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);
  const closeNewQuizModal = () => setIsCloneModalOpen(false);
  const invalidateQuizzes = () => queryClient.invalidateQueries("quizzes");

  const handleUpdate = () => {
    const updatedStatus =
      status === QUIZ_STATUSES.PUBLISHED.STATUS
        ? QUIZ_STATUSES.DRAFT.STATUS
        : QUIZ_STATUSES.PUBLISHED.STATUS;

    updateQuiz(
      { slug, payload: { status: updatedStatus } },
      { onSuccess: invalidateQuizzes }
    );
  };

  const handleDelete = () => {
    deleteQuiz(slug, {
      onSuccess: () => {
        invalidateQuizzes();
        queryClient.invalidateQueries("categories");
      },
    });
  };

  const handleClone = () => {
    cloneQuiz({ slug, name: newQuizName }, { onSuccess: invalidateQuizzes });
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
      <ConfirmationModal
        isOpen={isCloneModalOpen}
        isPrimaryButtonDisabled={quizName === newQuizName}
        primaryButtonAction={handleClone}
        primaryButtonLabel={t("labels.save")}
        title={t("labels.newNameForQuiz")}
        onClose={closeNewQuizModal}
      >
        <Input
          value={newQuizName}
          onChange={event => setNewQuizName(event.target.value)}
        />
      </ConfirmationModal>
      <ConfirmationModal
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
          {t("messages.warnings.confirmDelete")}
        </Typography>
      </ConfirmationModal>
    </>
  );
};
export default ActionList;
