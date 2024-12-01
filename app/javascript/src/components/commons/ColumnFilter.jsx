import React, { useState } from "react";

import { Column } from "neetoicons";
import { Dropdown, Checkbox } from "neetoui";
import { without } from "ramda";

const ColumnFilter = ({ schema, setVisibleColumns }) => {
  const [columnsToHide, setColumnsToHide] = useState([]);

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
    <Dropdown buttonStyle="text" icon={Column}>
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

export default ColumnFilter;
