import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Typography, Dropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";

const Card = ({ name, quizCount }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between rounded-lg border p-3">
      <div className="flex flex-col gap-2">
        <Typography style="h3">{name}</Typography>
        <Typography className="text-gray-400">
          {t("labels.quiz", { count: quizCount })}
        </Typography>
      </div>
      <div>
        <Dropdown buttonProps={{ style: "text" }} icon={MenuHorizontal}>
          <div className="flex flex-col">
            <Button label={t("labels.edit")} style="text" />
            <Button label={t("labels.delete")} style="text" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Card;
