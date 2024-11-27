import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import quizzesApi from "apis/quizzes";
import { QUIZ_STATUSES } from "components/constants";

const ActionList = ({ slug, status, reloadQuizzes }) => {
  const { t } = useTranslation();

  const statusUpdateButtonLabel =
    status === QUIZ_STATUSES.PUBLISHED.STATUS
      ? t("labels.unpublish")
      : t("labels.publish");

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

  return (
    <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
      <div className="flex flex-col">
        <Button
          label={statusUpdateButtonLabel}
          style="text"
          onClick={handleUpdate}
        />
        <Button
          label={t("labels.delete")}
          style="danger-text"
          onClick={handleDelete}
        />
      </div>
    </Dropdown>
  );
};
export default ActionList;
