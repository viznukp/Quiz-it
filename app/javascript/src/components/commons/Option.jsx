import React from "react";

import classNames from "classnames";
import { Field } from "formik";
import { Delete, CheckCircle, Checkmark, CloseCircle } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const Option = ({
  number = 1,
  deleteSelf,
  isRemovable,
  onSelectCorrect,
  style = "",
  isDisabled = false,
  isStatusLabelEnabled = false,
  statusLabel = "",
  statusLabelStyle = "",
}) => {
  const { t } = useTranslation();
  const styles = { correct: "correct", wrong: "wrong" };
  const isCorrectStyle = style === styles.correct;
  const isWrongStyle = style === styles.wrong;

  const renderIcon = () => {
    if (isWrongStyle) return <CloseCircle />;

    if (isCorrectStyle) return <Checkmark />;

    return <CheckCircle />;
  };

  return (
    <div
      className={classNames("rounded-lg border-2 px-2 py-3", {
        "border-green-500": isCorrectStyle,
        "border-red-500": isWrongStyle,
      })}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={classNames("cursor-pointer", {
            "text-green-500": isCorrectStyle,
            "text-red-500": isWrongStyle,
            "text-blue-300": !(isWrongStyle || isCorrectStyle),
          })}
          onClick={onSelectCorrect}
        >
          {renderIcon()}
        </button>
        <Field
          className="w-full border-0 p-2 text-base font-medium text-gray-700 focus:outline-none"
          disabled={isDisabled}
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
      {isStatusLabelEnabled && (
        <div className="mt-1 flex justify-end">
          <Typography
            style="body3"
            className={classNames({
              "text-green-500": statusLabelStyle === styles.correct,
              "text-red-500": statusLabelStyle === styles.wrong,
            })}
          >
            {statusLabel}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Option;
