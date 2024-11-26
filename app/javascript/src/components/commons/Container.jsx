import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";

const Container = ({ children, navbar, className = "" }) => (
  <div className="flex h-screen w-full overflow-hidden">
    <Sidebar />
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
};

export default Container;
