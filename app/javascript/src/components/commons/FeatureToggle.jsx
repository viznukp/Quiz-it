import React from "react";

import { Switch, Typography } from "neetoui";

const FeatureToggle = ({
  checked = false,
  title,
  description,
  onChange,
  children,
}) => (
  <div className="border bg-white p-4">
    <div className="flex items-center gap-3">
      <Switch checked={checked} onChange={onChange} />
      <div>
        <Typography style="h4">{title}</Typography>
        <Typography className="mt-1" style="body2">
          {description}
        </Typography>
      </div>
    </div>
    {children}
  </div>
);

export default FeatureToggle;
