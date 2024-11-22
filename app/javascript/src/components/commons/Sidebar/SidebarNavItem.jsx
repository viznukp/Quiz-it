import React from "react";

import classNames from "classnames";
import { Tooltip, Typography } from "neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom";

const SidebarNavItem = ({
  label,
  toolTipLabel = "",
  toolTipEnabled = false,
  icon,
  onClickRoute = "",
  onClickAction,
  expanded = false,
  active = false,
  style = "link",
}) => {
  const renderContent = (
    <div
      className={classNames(
        "flex h-10 items-center gap-3 rounded-md transition-all duration-500 ease-in-out hover:bg-gray-200",
        { "justify-start border-b px-2": expanded },
        { "w-10 justify-center": !expanded },
        { "bg-blue-500": active }
      )}
    >
      {icon}
      {expanded && <Typography>{label}</Typography>}
    </div>
  );

  return (
    <Tooltip
      content={toolTipLabel || label}
      disabled={!toolTipEnabled || expanded}
    >
      {style === "link" ? (
        <Link to={onClickRoute}>{renderContent}</Link>
      ) : (
        <button className="w-full" onClick={onClickAction}>
          {renderContent}
        </button>
      )}
    </Tooltip>
  );
};

SidebarNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  toolTipLabel: PropTypes.string,
  toolTipEnabled: PropTypes.bool,
  icon: PropTypes.node,
  style: PropTypes.oneOf(["link", "button"]),
  expanded: PropTypes.bool,
  active: PropTypes.bool,
  onClickRoute: PropTypes.string,
  onClickAction: PropTypes.func,
};

export default SidebarNavItem;
