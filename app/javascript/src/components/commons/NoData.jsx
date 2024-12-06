import React from "react";

import { Typography } from "neetoui";

const NoData = ({ message }) => (
  <div className="flex h-64 items-center justify-center">
    <Typography style="h3" weight="semibold">
      {message}
    </Typography>
  </div>
);

export default NoData;
