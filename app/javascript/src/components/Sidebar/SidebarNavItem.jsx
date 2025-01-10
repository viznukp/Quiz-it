import React from "react";

import classNames from "classnames";
import { Tooltip, Typography } from "neetoui";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";
import { Link, useLocation } from "react-router-dom";

import useSideBarStore from "stores/useSideBarStore";

const SidebarNavItem = ({
  label,
  toolTipLabel = "",
  toolTipEnabled = false,
  icon,
  onClickRoute = "",
  baseRoute = "",
  onClickAction,
  style = "link",
  className,
}) => {
  const { pathname: currentRoute } = useLocation();
  const { isExpanded } = useSideBarStore();
  const isActive =
    currentRoute === onClickRoute ||
    (currentRoute.includes(baseRoute) &&
      !isEmpty(onClickRoute) &&
      !isEmpty(baseRoute));

  const renderContent = (
    <div
      className={classNames(
        "flex h-10 items-center gap-3 rounded-md hover:bg-gray-200",
        { "justify-start border-b px-2": isExpanded },
        { "w-10 justify-center": !isExpanded },
        { "bg-blue-500": isActive },
        [className]
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
        <Link
          className={classNames({ "w-full": isExpanded })}
          to={onClickRoute}
        >
          {renderContent}
        </Link>
      ) : (
        <button
          className={classNames({ "w-full": isExpanded })}
          onClick={onClickAction}
        >
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
  className: PropTypes.string,
};

export default SidebarNavItem;
