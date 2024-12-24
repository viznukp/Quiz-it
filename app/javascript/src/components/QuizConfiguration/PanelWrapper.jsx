import React from "react";

import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { CONFIGURATION_PANELS } from "./constants";

const PanelWrapper = ({
  currentPanel,
  setActivePanel,
  children,
  onSave,
  onCancel,
  isPrimaryButtonDisabled,
  isSecondaryButtonDisabled,
}) => {
  const { t } = useTranslation();
  const breadcrumbsClassNames = "cursor-pointer hover:text-blue-500";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 text-gray-500">
        <Typography
          className={breadcrumbsClassNames}
          style="body2"
          onClick={() => setActivePanel(CONFIGURATION_PANELS.dashboard)}
        >
          {CONFIGURATION_PANELS.dashboard.title}
        </Typography>
        <Typography>/</Typography>
        <Typography
          className={breadcrumbsClassNames}
          style="body2"
          onClick={() => setActivePanel(currentPanel)}
        >
          {currentPanel.title}
        </Typography>
      </div>
      <Typography className="mb-6" style="h3">
        {currentPanel.title}
      </Typography>
      {children}
      <div className="mt-8 flex gap-2">
        <Button
          disabled={isPrimaryButtonDisabled}
          label={t("labels.saveChanges")}
          onClick={onSave}
        />
        <Button
          disabled={isSecondaryButtonDisabled}
          label={t("labels.cancel")}
          style="secondary"
          onClick={onCancel}
        />
      </div>
    </div>
  );
};

export default PanelWrapper;
