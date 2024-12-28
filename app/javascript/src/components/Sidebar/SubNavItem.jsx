import React from "react";

import classNames from "classnames";

const SubNavItem = ({ label, count, isActive = false, onClick }) => (
  <button
    className={classNames(
      "flex items-center justify-between gap-2 rounded-lg px-3 py-1 hover:bg-gray-200",
      { "bg-blue-200": isActive }
    )}
    onClick={onClick}
  >
    <span>{label}</span>
    <span className="rounded-lg bg-gray-100 p-2"> {count} </span>
  </button>
);

export default SubNavItem;
