import React, { useState } from "react";

import { Filter as FilterIcon } from "neetoicons";
import { Typography, Pane, Button } from "neetoui";
import { Form as NeetoUIForm, Input, Select } from "neetoui/formik";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import { CategorySelector } from "components/commons";
import { QUIZ_STATUSES } from "components/constants";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import { FILTER_INITIAL_VALUES } from "./constants";

const Filter = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  const { category: queryCategory, quizName, status } = queryParams;

  const { data: { categories = [] } = {} } = useFetchCategories();
  const history = useHistory();

  const closeFilter = () => setIsFilterPaneOpen(false);

  const selectedCategory = categories.find(
    category => category.name.toLowerCase() === queryCategory?.toLowerCase()
  );

  const handleFilterSubmit = formData => {
    history.replace(
      buildUrl(
        routes.index,
        mergeLeft(
          {
            quizName: formData.quizName,
            category: formData.category?.value?.name,
            status: formData.status?.value,
          },
          queryParams
        )
      )
    );
    closeFilter();
  };

  return (
    <>
      <Button
        icon={FilterIcon}
        style="text"
        tooltipProps={{ content: t("labels.filter"), position: "top" }}
        onClick={() => setIsFilterPaneOpen(!isFilterPaneOpen)}
      />
      <Pane
        className="px-4 pb-4 pt-12"
        isOpen={isFilterPaneOpen}
        onClose={closeFilter}
      >
        <Typography style="h2"> {t("labels.filters")}</Typography>
        <NeetoUIForm
          className="mt-4 flex flex-col gap-3"
          formikProps={{
            initialValues: {
              quizName,
              category: selectedCategory
                ? { label: selectedCategory.name, value: selectedCategory }
                : null,
              status: status ? { label: status, value: status } : null,
            },
            onSubmit: handleFilterSubmit,
          }}
        >
          <Input label={t("labels.name")} name="quizName" />
          <CategorySelector />
          <Select
            isClearable
            label={t("labels.status")}
            name="status"
            options={[
              { label: t("labels.draft"), value: QUIZ_STATUSES.DRAFT.STATUS },
              {
                label: t("labels.published"),
                value: QUIZ_STATUSES.PUBLISHED.STATUS,
              },
            ]}
          />
          <div className="flex gap-2">
            <Button label={t("labels.done")} type="submit" />
            <Button
              label={t("labels.clearFilters")}
              style="secondary"
              onClick={() => {
                handleFilterSubmit(FILTER_INITIAL_VALUES);
                closeFilter();
              }}
            />
          </div>
        </NeetoUIForm>
      </Pane>
    </>
  );
};

export default Filter;
