import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { Container, ContentWrapper, NavBar } from "components/commons";
import { useFetchRedirections } from "hooks/reactQuery/useRedirectionsApi";

import CreateOrEdit from "./CreateOrEdit";
import UrlCard from "./UrlCard";

import { SETTINGS_TABS, SETTINGS_TAB_IDS } from "../constants";

const Redirection = () => {
  const { t } = useTranslation();
  const [isCreatingRedirection, setIsCreatingRedirection] = useState(false);

  const { data: { redirections = [] } = {} } = useFetchRedirections();

  return (
    <Container>
      <NavBar
        isTabsEnabled
        activeTab={SETTINGS_TAB_IDS.redirections}
        tabs={SETTINGS_TABS}
      />
      <ContentWrapper>
        <Typography style="h2">{t("labels.redirections")}</Typography>
        <Typography>{t("redirectionsDescription")}</Typography>
        <div className="mt-12 flex flex-col gap-3">
          {!isEmpty(redirections) && (
            <div className="grid grid-cols-2 gap-12 border-b pb-2">
              <Typography weight="semibold">{t("labels.from")}</Typography>
              <Typography weight="semibold">{t("labels.to")}</Typography>
            </div>
          )}
          {redirections.map(redirection => (
            <UrlCard key={redirection.id} redirectionData={redirection} />
          ))}
          {isCreatingRedirection && (
            <div className="bg-white p-4 shadow-sm">
              <CreateOrEdit onClose={() => setIsCreatingRedirection(false)} />
            </div>
          )}
        </div>
        <Button
          className="mb-12 mt-6 text-blue-500"
          disabled={isCreatingRedirection}
          icon={Plus}
          iconPosition="left"
          label={t("labels.addNewRedirection")}
          style="text"
          onClick={() => setIsCreatingRedirection(true)}
        />
      </ContentWrapper>
    </Container>
  );
};

export default Redirection;
