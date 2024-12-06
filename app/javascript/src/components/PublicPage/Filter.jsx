import React, { useState, useEffect, useRef } from "react";

import { Filter as FilterIcon } from "neetoicons";
import { Typography, Button, Dropdown } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useFetchCategories } from "hooks/reactQuery/useQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

const Filter = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const filterRef = useRef(null);
  const buttonRef = useRef(null);

  const { data: { categories = [] } = {} } = useFetchCategories();

  const handleCategoryFilterSubmit = category => {
    history.replace(buildUrl("", mergeLeft({ category }, queryParams)));
  };

  const handleClickOutside = event => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target) &&
      event.target !== buttonRef.current
    ) {
      setIsFilterVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterButtonClick = event => {
    event.preventDefault();
    setIsFilterVisible(prev => !prev);
  };

  return (
    <div className="relative">
      <Button
        icon={FilterIcon}
        ref={buttonRef}
        style="text"
        tooltipProps={{ content: t("labels.filterByCategory") }}
        onClick={handleFilterButtonClick}
      />
      {isFilterVisible && (
        <div
          className="absolute z-10 mt-2 flex w-48 flex-col gap-3 rounded-lg border bg-white px-4 py-3 shadow-xl"
          ref={filterRef}
        >
          <Typography style="h4">{t("labels.category")}</Typography>
          <Dropdown
            buttonStyle="secondary"
            className="border"
            label={t("labels.selectCategory")}
          >
            {categories?.map(category => (
              <div
                className="cursor-pointer rounded p-1 text-base hover:bg-gray-200"
                key={category}
                onClick={() => handleCategoryFilterSubmit(category)}
              >
                {category}
              </div>
            ))}
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Filter;
