import React from "react";

import classNames from "classnames";
import { capitalize } from "neetocist";
import { Typography, Button, Tag } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "src/routes";

const Card = ({ name, slug, category, questionsCount = 0, color }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="rounded border px-3 py-4 shadow-lg">
      <Typography style="h3">{name}</Typography>
      <Tag
        className={classNames("mt-2", [color])}
        label={capitalize(category)}
        type="solid"
      />
      <Typography className="mt-6">
        {t("labels.questionsCount", { count: questionsCount })}
      </Typography>
      <Button
        fullWidth
        className="mt-2"
        label={t("labels.startQuiz")}
        onClick={() => history.push(routes.attemptQuiz.replace(":slug", slug))}
      />
    </div>
  );
};

export default Card;
