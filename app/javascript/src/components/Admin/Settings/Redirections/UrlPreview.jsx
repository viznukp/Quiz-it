import React from "react";

import { useTranslation } from "react-i18next";

import { TruncatedLabel } from "components/Admin/commons";

const UrlPreview = ({ url }) => {
  const { t } = useTranslation();

  return (
    <TruncatedLabel
      className="w-full italic text-gray-400"
      label={`${t("labels.preview")}: ${url}`}
      typographyStyle="body3"
    />
  );
};

export default UrlPreview;
