import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Radio, Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "src/routes";

const QuestionDisplayCard = ({ question, id, options, answerIndex, slug }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border p-4">
      <div className="relative flex justify-between">
        <Typography weight="semibold">{question}</Typography>
        <Button
          icon={MenuHorizontal}
          style="text"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 flex flex-col rounded-lg border bg-white p-3 shadow-lg">
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
            <Button label={t("labels.clone")} style="text" />
            <Button label={t("labels.delete")} style="danger-text" />
          </div>
        )}
      </div>
      <Radio stacked>
        {options?.map(option => (
          <Radio.Item
            checked={options[answerIndex - 1] === option}
            key={option}
            label={option}
            value={option}
          />
        ))}
      </Radio>
    </div>
  );
};

export default QuestionDisplayCard;
