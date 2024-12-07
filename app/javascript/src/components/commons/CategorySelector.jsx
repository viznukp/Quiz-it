import React from "react";

import { Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const CategorySelector = ({ categories = [] }) => {
  const { t } = useTranslation();

  return (
    <Select
      isClearable
      isSearchable
      label={t("labels.category")}
      name="category"
      options={categories?.map(category => ({
        label: category.name,
        value: category,
      }))}
    />
  );
};

export default CategorySelector;
