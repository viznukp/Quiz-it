import React, { useRef } from "react";

import { Filter as FilterIcon, Close } from "neetoicons";
import { Typography, Dropdown, Button } from "neetoui";
import { mergeLeft, isEmpty, either, isNil } from "ramda";
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
        <div
          className="absolute z-10 mt-2 flex w-48 flex-col gap-3 rounded-lg border bg-white px-4 py-3 shadow-xl"
          ref={filterRef}
        >
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
      {!either(isNil, isEmpty)(queryParams.category) && (
        <Button
          icon={Close}
          style="danger-text"
          tooltipProps={{
            content: t("labels.clearFilters"),
            position: "top",
          }}
          onClick={() => handleCategoryFilterSubmit("")}
        />
      )}
    </div>
  );
};

export default Filter;
