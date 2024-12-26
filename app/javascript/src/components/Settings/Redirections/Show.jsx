import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { TruncatedLabel } from "components/commons";

const Show = ({ source, destination }) => {
  const { t } = useTranslation();

  return (
    <div className="grid w-full grid-cols-2 gap-4 py-2">
      {/* <Typography className=" break-words">{source}</Typography> */}
      <TruncatedLabel className="text-gray-500" label={source} />
      <div className="flex w-full flex-1 justify-between">
        <TruncatedLabel className="text-gray-500" label={destination} />
        <div className="h-8 w-8">
          <Dropdown
            buttonProps={{
              icon: MenuHorizontal,
              style: "text",
            }}
          >
            <div className="flex flex-col">
              <Button label={t("labels.edit")} style="text" />
              <Button label={t("labels.delete")} style="text" />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Show;
