import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import Delete from "./Delete";
import Edit from "./Edit";

const ActionList = ({ category, categoryCount }) => {
  const { t } = useTranslation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(category.name === "Math");

  return (
    <>
      <Dropdown buttonProps={{ style: "text" }} icon={MenuHorizontal}>
        <div className="flex flex-col">
          <Button
            label={t("labels.edit")}
            style="text"
            onClick={() => setIsEditOpen(true)}
          />
          <Button
            label={t("labels.delete")}
            style="text"
            onClick={() => setIsDeleteOpen(true)}
          />
        </div>
      </Dropdown>
      <Edit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        {...category}
      />
      <Delete
        categoryCount={categoryCount}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        {...category}
      />
    </>
  );
};

export default ActionList;
