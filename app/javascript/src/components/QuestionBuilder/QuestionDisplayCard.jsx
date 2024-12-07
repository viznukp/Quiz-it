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
  answerIndex,
  slug,
  refetchQuizzes,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleQuestionDelete = async () => {
    try {
      await questionsApi.destroy(id);
      refetchQuizzes();
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
              onClick={() =>
                history.push(
                  routes.quiz.question.clone
                    .replace(":slug", slug)
                    .replace(":id", id)
                )
              }
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
        {options?.map((option, index) => (
          <Radio.Item
            checked={options[answerIndex - 1] === option}
            key={index}
            label={option}
            value={option}
          />
        ))}
      </Radio>
    </div>
  );
};

export default QuestionDisplayCard;
