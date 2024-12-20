import React from "react";

import { Switch, Typography } from "neetoui";

const FeatureToggle = ({ checked = false, title, description, onChange }) => (
  <div className="flex items-center gap-3 border bg-white p-4">
    <Switch checked={checked} onChange={onChange} />
    <div>
      <Typography style="h4">{title}</Typography>
      <Typography className="mt-1" style="body2">
        {description}
      </Typography>
    </div>
  </div>
);

export default FeatureToggle;
