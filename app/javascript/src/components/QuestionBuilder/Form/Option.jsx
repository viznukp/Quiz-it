import React from "react";

import classNames from "classnames";
import { Field } from "formik";
import { Delete, CheckCircle, Checkmark } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";

const Option = ({
  number = 1,
  deleteSelf,
  isRemovable,
  isSelected,
  onSelectCorrect,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 rounded-lg border px-2 py-3">
      <button
        type="button"
        className={classNames("cursor-pointer", {
          "text-green-500": isSelected,
        })}
        onClick={onSelectCorrect}
      >
        {isSelected ? <Checkmark /> : <CheckCircle />}
      </button>
      <Field
        className="w-full border-0 p-2 focus:outline-none"
        name={`options[${number - 1}]`}
        placeholder={t("labels.typeOption", { number })}
      />
      {isRemovable && (
        <Button
          className="text-purple-700"
          icon={Delete}
          style="text"
          onClick={deleteSelf}
        />
      )}
    </div>
  );
};

export default Option;
