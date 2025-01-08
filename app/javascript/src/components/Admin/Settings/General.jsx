import React, { useState, useEffect } from "react";

import { Typography, Button, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import {
  Container,
  PageLoader,
  ContentWrapper,
  NavBar,
} from "components/commons";
import {
  useShowOrganization,
  useUpdateOrganization,
} from "hooks/reactQuery/useOrganizationApi";

import { SETTINGS_TABS, SETTINGS_TAB_IDS } from "./constants";

const General = () => {
  const { t } = useTranslation();
  const [siteName, setSiteName] = useState("");
  const [initialName, setInitialName] = useState("");

  const { mutate: updateOrganization } = useUpdateOrganization();

  const {
    data: { organization = "" } = {},
    isLoading,
    refetch,
  } = useShowOrganization();

  const handleUpdate = () => {
    updateOrganization({ name: siteName.trim() }, { onSuccess: refetch });
  };

  useEffect(() => {
    setSiteName(organization);
    setInitialName(organization);
  }, [organization]);

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container>
      <NavBar
        isTabsEnabled
        activeTab={SETTINGS_TAB_IDS.general}
        tabs={SETTINGS_TABS}
      />
      <ContentWrapper>
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
              onClick={handleUpdate}
            />
            <Button
              disabled={initialName === siteName}
              label={t("labels.cancel")}
              style="secondary"
              onClick={() => setSiteName(initialName)}
            />
          </div>
        </div>
      </ContentWrapper>
    </Container>
  );
};

export default General;
