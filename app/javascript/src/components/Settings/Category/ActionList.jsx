import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import Edit from "./Edit";

const ActionList = ({ category }) => {
  const { t } = useTranslation();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <Dropdown buttonProps={{ style: "text" }} icon={MenuHorizontal}>
        <div className="flex flex-col">
          <Button
            label={t("labels.edit")}
            style="text"
            onClick={() => setIsEditOpen(true)}
          />
        </div>
      </Dropdown>
      <Edit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        {...category}
      />
    </>
  );
};

export default ActionList;
