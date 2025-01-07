import React from "react";

import { Filter as FilterIcon } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

const Filter = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();

  const { data: { categories = [] } = {} } = useFetchCategories();

  const handleCategoryFilterSubmit = category => {
    history.replace(
      buildUrl(routes.index, mergeLeft({ category }, queryParams))
    );
  };

  return (
    <Dropdown buttonStyle="text" icon={FilterIcon}>
      <div className="p-4">
        <Typography className="px-2 py-1" style="h4">
          {t("labels.selectCategory")}
        </Typography>
        {categories?.map(({ id, name }) => (
          <div
            className="cursor-pointer rounded px-2 py-1 text-base hover:bg-gray-200"
            key={id}
            onClick={() => handleCategoryFilterSubmit(name)}
          >
            {name}
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default Filter;
