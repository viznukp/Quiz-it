import React from "react";

import { Tooltip } from "neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom";

import { isEmptyString } from "utils/stringUtils";

const SidebarNavItem = ({ toolTipLabel = "", icon, onClickRoute = "" }) => (
  <Tooltip content={toolTipLabel} disabled={isEmptyString(toolTipLabel)}>
    <Link
      className="flex h-8 w-8 items-center justify-center rounded-md transition-all ease-in hover:bg-gray-200"
      to={onClickRoute}
    >
      {icon}
    </Link>
  </Tooltip>
);

SidebarNavItem.propTypes = {
  toolTipLabel: PropTypes.string,
  icon: PropTypes.node,
  onClickRoute: PropTypes.string,
};

export default SidebarNavItem;
