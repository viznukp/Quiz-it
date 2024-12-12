import React, { useRef } from "react";

import { Filter as FilterIcon } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

const Filter = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();
  const filterRef = useRef(null);

  const { data: { categories = [] } = {} } = useFetchCategories();

  const handleCategoryFilterSubmit = category => {
    history.replace(buildUrl("", mergeLeft({ category }, queryParams)));
  };

  return (
    <div>
      <Dropdown buttonStyle="text" icon={FilterIcon}>
        <div className=" flex flex-col gap-3 px-4 py-3 " ref={filterRef}>
          <Typography style="h4">{t("labels.category")}</Typography>
          <div onClick={event => event.stopPropagation()}>
            <Dropdown
              buttonStyle="secondary"
              className="border"
              label={t("labels.selectCategory")}
            >
              {categories?.map(({ id, name }) => (
                <div
                  className="cursor-pointer rounded p-1 text-base hover:bg-gray-200"
                  key={id}
                  onClick={() => handleCategoryFilterSubmit(name)}
                >
                  {name}
                </div>
              ))}
            </Dropdown>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filter;
