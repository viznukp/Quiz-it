import React from "react";

import { Typography } from "neetoui";

const Card = ({ title, description, icon, onClick }) => (
  <div
    className="mx-auto w-full cursor-pointer border bg-white p-4 transition-all ease-in hover:shadow-lg"
    onClick={onClick}
  >
    <div className="flex gap-3">
      {icon}
      <Typography className="hover:text-blue-600" style="h4">
        {title}
      </Typography>
    </div>
    <Typography className="mt-3 overflow-hidden break-words" style="body2">
      {description}
    </Typography>
  </div>
);

export default Card;
