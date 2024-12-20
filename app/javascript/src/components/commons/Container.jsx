import React from "react";

import PropTypes from "prop-types";

import Sidebar from "components/Sidebar";

const Container = ({ children, sideBarDisabled = false }) => (
  <div className="neeto-ui-bg-gray-100 flex h-screen w-full overflow-hidden">
    {!sideBarDisabled && <Sidebar />}
    <div className="flex flex-1 flex-col">{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
  sideBarDisabled: PropTypes.bool,
};

export default Container;
