import React, { useState } from "react";

import { Typography, Button, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import { Container } from "components/commons";

const Settings = () => {
  const { t } = useTranslation();
  const [siteName, setSiteName] = useState("Placeholder site name");

  return (
    <Container>
      <div className="ml-8 mt-16 flex w-80 flex-col gap-12">
        <div>
          <Typography style="h2">{t("labels.generalSettings")}</Typography>
          <Typography style="h5" weight="light">
            {t("messages.info.customizeQuizSiteName")}
          </Typography>
        </div>
        <Input
          label={t("labels.quizTitle")}
          placeholder={t("labels.enterQuizTitle")}
          value={siteName}
          onChange={event => setSiteName(event.target.value)}
        />
        <div className="flex gap-3">
          <Button label={t("labels.saveChanges")} />
          <Button label={t("labels.cancel")} style="secondary" />
        </div>
      </div>
    </Container>
  );
};

export default Settings;
