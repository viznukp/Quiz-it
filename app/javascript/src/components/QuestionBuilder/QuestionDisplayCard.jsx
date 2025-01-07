import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Radio, Typography, Button, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "src/routes";

import { ConfirmationModal } from "components/commons";
import {
  useDeleteQuestion,
  useCloneQuestion,
} from "hooks/reactQuery/useQuestionsApi";
import { buildRoute } from "utils/url";

const QuestionDisplayCard = ({ question, id, options, answerId, slug }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const { mutate: deleteQuestion } = useDeleteQuestion();
  const { mutate: cloneQuestion } = useCloneQuestion();

  const reloadQuiz = () => queryClient.invalidateQueries("quiz");

  const handleDelete = () => {
    deleteQuestion(id, {
      onSuccess: reloadQuiz,
    });
  };

  const handleClone = () => {
    cloneQuestion(id, {
      onSuccess: reloadQuiz,
    });
  };

  return (
    <div className="border p-4">
      <div className="relative flex justify-between">
        <Typography weight="semibold">{question}</Typography>
        <Dropdown buttonStyle="text" icon={MenuHorizontal}>
          <div className="flex flex-col">
            <Button
              label={t("labels.edit")}
              style="text"
              onClick={() =>
                history.push(
                  buildRoute(routes.admin.quiz.question.edit, { slug, id })
                )
              }
            />
            <Button
              label={t("labels.clone")}
              style="text"
              onClick={handleClone}
            />
            <Button
              label={t("labels.delete")}
              style="danger-text"
              onClick={() => setIsDeleteActive(true)}
            />
          </div>
        </Dropdown>
      </div>
      <Radio stacked>
        {options?.map(({ id, option }) => (
          <Radio.Item
            checked={answerId === id}
            key={id}
            label={option}
            value={option}
          />
        ))}
      </Radio>
      {isDeleteActive && (
        <ConfirmationModal
          isOpen={isDeleteActive}
          primaryButtonAction={handleDelete}
          primaryButtonStyle="danger"
          title={t("messages.warnings.confirmDeleteEntity", {
            entity: t("labels.questionLower"),
          })}
          onClose={() => setIsDeleteActive(false)}
        />
      )}
    </div>
  );
};

export default QuestionDisplayCard;
