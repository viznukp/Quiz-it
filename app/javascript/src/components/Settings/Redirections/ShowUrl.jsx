import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const ShowUrl = ({ source, destination }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography className=" break-words">{source}</Typography>
      <div className="flex w-full justify-between">
        <Typography className="max-w-[90%] break-words">
          {destination}
        </Typography>
        <Dropdown
          buttonProps={{
            icon: MenuHorizontal,
            style: "text",
            className: "h-8",
          }}
        >
          <div className="flex flex-col">
            <Button label={t("labels.edit")} style="text" />
            <Button label={t("labels.delete")} style="text" />
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default ShowUrl;
