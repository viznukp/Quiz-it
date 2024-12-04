import React from "react";

import { Typography, Pane, Button } from "neetoui";
import { Form as NeetoUIForm, Input, Select } from "neetoui/formik";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { QUIZ_STATUSES } from "components/constants";
import { useFetchCategories } from "hooks/reactQuery/useQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import { FILTER_INITIAL_VALUES } from "./constants";

const Filter = ({ isOpen, closeFilter }) => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const { category = "", quizName = "", status = "" } = queryParams;

  const { data: { categories = [] } = {} } = useFetchCategories();
  const history = useHistory();

  const handleFilterSubmit = formData => {
    history.replace(
      buildUrl(
        "",
        mergeLeft(
          {
            ...formData,
            category: formData.category?.value,
            status: formData.status?.value,
          },
          queryParams
        )
      )
    );
    closeFilter();
  };

  return (
    <Pane className="px-4 pb-4 pt-12" isOpen={isOpen} onClose={closeFilter}>
      <Typography style="h2"> Filters</Typography>
      <NeetoUIForm
        className="mt-4 flex flex-col gap-3"
        formikProps={{
          initialValues: { quizName, category, status },
          onSubmit: handleFilterSubmit,
        }}
      >
        <Input label={t("labels.name")} name="quizName" />
        <Select
          isClearable
          isSearchable
          label={t("labels.category")}
          name="category"
          options={categories?.map(category => ({
            label: category,
            value: category,
          }))}
        />
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
  );
};

export default Filter;
