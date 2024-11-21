import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";

const Container = ({ children, className = "" }) => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <div className={classnames("mx-auto max-w-6xl flex-1 px-6", [className])}>
      {children}
    </div>
  </div>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
