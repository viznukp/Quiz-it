import React from "react";

import { Typography, Button, Tag } from "neetoui";
import { either, isNil, isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

const SelectedCategoryDisplay = () => {
  const queryParams = useQueryParams();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      {!either(isNil, isEmpty)(queryParams.category) && (
        <div className="mb-4 flex items-center gap-2">
          <Typography>Selected: </Typography>
          <Tag className="h-5" label={queryParams.category} />
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

export default SelectedCategoryDisplay;
