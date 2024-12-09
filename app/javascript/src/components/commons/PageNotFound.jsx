import React from "react";

import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "src/routes";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <NoData
        title={t("pageNotFound.title")}
        primaryButtonProps={{
          label: t("pageNotFound.label"),
          to: routes.root,
        }}
      />
    </div>
  );
};

export default PageNotFound;
