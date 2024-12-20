import React from "react";

import { Typography } from "neetoui";

const Card = ({ title, description, icon }) => (
  <div className="mx-auto w-full border bg-white p-4">
    <div className="flex gap-3">
      {icon}
      <Typography style="h4">{title}</Typography>
    </div>
    <Typography className="mt-3 overflow-hidden break-words" style="body2">
      {description}
    </Typography>
  </div>
);

export default Card;
