import React from "react";

import classNames from "classnames";
import { Button } from "neetoui";
import { either, isNil, isEmpty, mergeLeft, pick, map } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import FilterTag from "./FilterTag";

const ActiveFilters = ({ filters, className = "" }) => {
  const queryParams = useQueryParams();
  const history = useHistory();
  const { t } = useTranslation();

  const filtersFromQueryParams = pick(filters, queryParams);

  const clearFilter = filter => {
    history.replace(buildUrl(routes.index, mergeLeft(filter, queryParams)));
  };

  return (
    <>
      {!either(isNil, isEmpty)(filtersFromQueryParams) && (
        <div className={classNames("flex items-center gap-2", className)}>
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
                buildUrl(
                  routes.index,
                  mergeLeft(
                    map(() => "", filtersFromQueryParams),
                    queryParams
                  )
                )
              )
            }
          />
        </div>
      )}
    </>
  );
};

export default ActiveFilters;
