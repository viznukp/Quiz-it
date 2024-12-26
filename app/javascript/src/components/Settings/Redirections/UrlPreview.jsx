import React from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const UrlPreview = ({ url }) => {
  const { t } = useTranslation();

  return (
    <Typography className="overflow-x-auto italic text-gray-400" style="body3">
      {t("labels.preview")}: {url}
    </Typography>
  );
};

export default UrlPreview;
