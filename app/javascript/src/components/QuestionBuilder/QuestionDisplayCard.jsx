import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Radio, Typography, Button, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "src/routes";

import questionsApi from "apis/questions";

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

  const handleQuestionDelete = async () => {
    try {
      await questionsApi.destroy(id);
      refetchQuiz();
    } catch (error) {
      logger.error(error);
    }
  };

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
              onClick={handleQuestionDelete}
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
    </div>
  );
};

export default QuestionDisplayCard;
