import React, { useState } from "react";

import { Typography, Pane, Button } from "neetoui";
import { Form as NeetoUIForm, Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { QUIZ_STATUSES } from "components/constants";

import { FILTER_INITIAL_VALUES } from "./constants";

const Filter = ({ isOpen, closeFilter, setFilterParams }) => {
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState(FILTER_INITIAL_VALUES);

  const handleFilterSubmit = values => {
    const filter = {
      ...values,
      status: values.status?.value,
    };
    setFilterParams(filter);
    setFilterValues(filter);
    closeFilter();
  };

  return (
    <Pane className="px-4 pb-4 pt-12" isOpen={isOpen} onClose={closeFilter}>
      <Typography style="h2"> Filters</Typography>
      <NeetoUIForm
        className="mt-4 flex flex-col gap-3"
        formikProps={{
          initialValues: filterValues,
          onSubmit: handleFilterSubmit,
        }}
      >
        <Input label={t("labels.name")} name="name" />
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
