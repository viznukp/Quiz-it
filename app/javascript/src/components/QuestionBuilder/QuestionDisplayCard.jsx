import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Radio, Typography, Button, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "src/routes";

import questionsApi from "apis/questions";

import Delete from "./Delete";

const QuestionDisplayCard = ({
  question,
  id,
  options,
  answerId,
  slug,
  refetchQuiz,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const handleQuestionClone = async () => {
    try {
      await questionsApi.clone(id);
      refetchQuiz();
    } catch (error) {
      logger.error(error);
    }
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
                  routes.quiz.question.edit
                    .replace(":slug", slug)
                    .replace(":id", id)
                )
              }
            />
            <Button
              label={t("labels.clone")}
              style="text"
              onClick={handleQuestionClone}
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
        <Delete
          id={id}
          isActive={isDeleteActive}
          onCancel={() => setIsDeleteActive(false)}
        />
      )}
    </div>
  );
};

export default QuestionDisplayCard;
