import React, { useState, useEffect } from "react";

import { Typography, Button, Input } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import organizationApi from "apis/organization";
import { Container } from "components/commons";
import { useShowOrganization } from "hooks/reactQuery/useOrganizationApi";

const Settings = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [siteName, setSiteName] = useState("");
  const [initialName, setInitialName] = useState("");

  const { data: { organization = "" } = {}, isLoading } = useShowOrganization();

  const handleSiteUpdate = async () => {
    try {
      await organizationApi.update({ name: siteName });
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    if (organization) {
      setSiteName(organization);
      setInitialName(organization);
    }
  }, [isLoading]);

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
          <Button
            disabled={initialName === siteName}
            label={t("labels.saveChanges")}
            onClick={handleSiteUpdate}
          />
          <Button
            label={t("labels.cancel")}
            style="secondary"
            onClick={() => history.push(routes.root)}
          />
        </div>
      </div>
    </Container>
  );
};

export default Settings;
