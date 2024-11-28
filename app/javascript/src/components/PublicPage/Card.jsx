import React from "react";

import { capitalize } from "neetocist";
import { Typography, Button, Tag } from "neetoui";
import { useTranslation } from "react-i18next";

const randomColorClass = () => {
  const colors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const Card = ({ name, category, questionCount = 0 }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded border px-3 py-4 shadow-lg">
      <Typography style="h3">{name}</Typography>
      <Tag
        className={`mt-2 ${randomColorClass()}`}
        label={capitalize(category)}
        type="solid"
      />
      <Typography className="mt-6">
        {t("labels.questions", { count: questionCount })}
      </Typography>
      <Button fullWidth className="mt-2" label={t("labels.startQuiz")} />
    </div>
  );
};

export default Card;
