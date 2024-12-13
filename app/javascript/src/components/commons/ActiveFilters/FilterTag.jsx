import React from "react";

import { Tag } from "neetoui";
import { isEmpty, isNil, either } from "ramda";
import { useTranslation } from "react-i18next";

const FilterTag = ({ label, value, onClose }) => {
  const { t } = useTranslation();

  return (
    !either(isNil, isEmpty)(value) && (
      <Tag
        className="h-5"
        label={t(`filters.${label}`, { [label]: value })}
        type="solid"
        onClose={() => onClose({ [label]: "" })}
      />
    )
  );
};

export default FilterTag;
