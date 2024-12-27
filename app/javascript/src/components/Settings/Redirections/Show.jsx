import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { TruncatedLabel } from "components/commons";

import Delete from "./Delete";

const Show = ({ id, source, destination, onEdit }) => {
  const { t } = useTranslation();
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  return (
    <div className="grid w-full grid-cols-2 gap-12 py-2">
      <TruncatedLabel className="text-gray-500" label={source} />
      <div className="flex w-full flex-1 justify-between gap-2">
        <TruncatedLabel className="text-gray-500" label={destination} />
        <div className="h-8 w-8">
          <Dropdown
            buttonProps={{
              icon: MenuHorizontal,
              style: "text",
            }}
          >
            <div className="flex flex-col">
              <Button label={t("labels.edit")} style="text" onClick={onEdit} />
              <Button
                label={t("labels.delete")}
                style="text"
                onClick={() => setIsDeleteActive(true)}
              />
            </div>
          </Dropdown>
          <Delete
            id={id}
            isActive={isDeleteActive}
            onCancel={() => setIsDeleteActive(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Show;
