import React, { useContext } from "react";

import classNames from "classnames";
import { Tooltip, Typography } from "neetoui";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";
import { Link, useLocation } from "react-router-dom";

import SidebarContext from "contexts/SidebarContext";

const SidebarNavItem = ({
  label,
  toolTipLabel = "",
  toolTipEnabled = false,
  icon,
  onClickRoute = "",
  onClickAction,
  style = "link",
}) => {
  const { pathname: currentRoute } = useLocation();
  const [isExpanded] = useContext(SidebarContext);
  const isActive = currentRoute === onClickRoute && !isEmpty(onClickRoute);
  const renderContent = (
    <div
      className={classNames(
        "flex h-10 items-center gap-3 rounded-md hover:bg-gray-300",
        { "justify-start border-b px-2": isExpanded },
        { "w-10 justify-center": !isExpanded },
        { "bg-blue-500": isActive }
      )}
    >
      {icon}
      {isExpanded && <Typography>{label}</Typography>}
    </div>
  );

  return (
    <Tooltip
      content={toolTipLabel || label}
      disabled={!toolTipEnabled || isExpanded}
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
  label: PropTypes.string,
  toolTipLabel: PropTypes.string,
  toolTipEnabled: PropTypes.bool,
  icon: PropTypes.node,
  style: PropTypes.oneOf(["link", "button"]),
  onClickRoute: PropTypes.string,
  onClickAction: PropTypes.func,
};

export default SidebarNavItem;
