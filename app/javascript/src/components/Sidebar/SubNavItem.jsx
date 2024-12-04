import React from "react";

import { Button } from "neetoui";

const SubNavItem = ({ label, count, onClick }) => (
  <div className="flex justify-between gap-2">
    <Button label={label} style="text" onClick={onClick} />
    <span className="rounded-lg bg-gray-100 p-2"> {count} </span>
  </div>
);

export default SubNavItem;
