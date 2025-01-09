import React from "react";

import { Column } from "neetoicons";
import { Dropdown, Checkbox } from "neetoui";
import PropTypes from "prop-types";
import { without } from "ramda";
import { useTranslation } from "react-i18next";

const ColumnFilter = ({
  schema = [],
  columnsToHide,
  setColumnsToHide,
  setVisibleColumns,
}) => {
  const { t } = useTranslation();

  const filterColumns = (schema, columnsToFilter) =>
    schema.filter(column => !columnsToFilter.includes(column.key));

  const handleColumnFilterChange = key => {
    const updatedColumnsToHide = columnsToHide.includes(key)
      ? without([key], columnsToHide)
      : [...columnsToHide, key];

    setColumnsToHide(updatedColumnsToHide);
    setVisibleColumns(filterColumns(schema, updatedColumnsToHide));
  };

  return (
    <Dropdown
      buttonStyle="text"
      closeOnSelect={false}
      icon={Column}
      buttonProps={{
        tooltipProps: { content: t("labels.columnFilter"), position: "top" },
      }}
    >
      <div className="flex flex-col gap-3 p-4">
        {schema.map(
          ({ title, key, excludeFromColumnFilter, isDisabledInColumnFilter }) =>
            !excludeFromColumnFilter && (
              <Checkbox
                checked={!columnsToHide.includes(key)}
                disabled={isDisabledInColumnFilter}
                key={key}
                label={title}
                value={key}
                onChange={() => handleColumnFilterChange(key)}
              />
            )
        )}
      </div>
    </Dropdown>
  );
};

ColumnFilter.propTypes = {
  schema: PropTypes.array,
  setVisibleColumns: PropTypes.func,
};

export default ColumnFilter;
