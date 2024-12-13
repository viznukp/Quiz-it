import React from "react";

import { Button } from "neetoui";
import { either, isNil, isEmpty, mergeLeft, pick } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import FilterTag from "./FilterTag";

const ActiveFilters = ({ filters }) => {
  const queryParams = useQueryParams();
  const history = useHistory();
  const { t } = useTranslation();

  const filtersFromQueryParams = pick(filters, queryParams);

  const clearFilter = filter => {
    history.replace(buildUrl("", mergeLeft(filter, queryParams)));
  };

  return (
    <>
      {!either(isNil, isEmpty)(queryParams) && (
        <div className="flex items-center gap-2">
          {Object.entries(filtersFromQueryParams).map(([filter, value]) => (
            <FilterTag
              key={filter}
              label={filter}
              value={value}
              onClose={clearFilter}
            />
          ))}
          <Button
            label={t("labels.clearFilters")}
            style="danger-text"
            onClick={() =>
              history.replace(
                buildUrl("", mergeLeft({ category: "" }, queryParams))
              )
            }
          />
        </div>
      )}
    </>
  );
};

export default ActiveFilters;
