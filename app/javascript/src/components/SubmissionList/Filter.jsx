import React from "react";

import { Typography, Pane, Button } from "neetoui";
import { Form as NeetoUIForm, Input, Select } from "neetoui/formik";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import { SUBMISSION_STATUSES } from "components/constants";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import { FILTER_INITIAL_VALUES } from "./constants";

const Filter = ({ isOpen, closeFilter }) => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const { name, status, email } = queryParams;

  const history = useHistory();

  const handleFilterSubmit = formData => {
    history.replace(
      buildUrl(
        routes.index,
        mergeLeft(
          {
            ...formData,
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
          initialValues: {
            name,
            email,
            status: { label: status, value: status },
          },
          onSubmit: handleFilterSubmit,
        }}
      >
        <Input label={t("labels.name")} name="name" />
        <Input label={t("labels.email")} name="email" />
        <Select
          isClearable
          label={t("labels.status")}
          name="status"
          options={[
            {
              label: t("labels.completed"),
              value: SUBMISSION_STATUSES.COMPLETED.STATUS,
            },
            {
              label: t("labels.incomplete"),
              value: SUBMISSION_STATUSES.INCOMPLETE.STATUS,
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
