import React from "react";

import { Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";

const CategorySelector = ({ excludedCategoryIds = [], label = "" }) => {
  const { t } = useTranslation();
  const { data: { categories = [] } = {} } = useFetchCategories();

  const filteredCategories = categories.filter(
    category => !excludedCategoryIds.includes(category.id)
  );

  return (
    <Select
      isClearable
      isSearchable
      label={label || t("labels.category")}
      name="category"
      options={filteredCategories?.map(category => ({
        label: category?.name,
        value: category,
      }))}
    />
  );
};

export default CategorySelector;
