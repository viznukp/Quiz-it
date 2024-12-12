import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Sidebar from "components/Sidebar";

const Container = ({
  children,
  navbar,
  sideBarDisabled = false,
  className = "",
}) => (
  <div className="flex h-screen w-full overflow-hidden">
    {!sideBarDisabled && <Sidebar />}
    <div className="flex flex-1 flex-col">
      {navbar}
      <div className="w-full flex-1 overflow-y-auto">
        <div className={classnames("mx-auto max-w-6xl px-6 pt-6", className)}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  navbar: PropTypes.node,
  sideBarDisabled: PropTypes.bool,
};

export default Container;
