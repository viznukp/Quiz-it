import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";

const Container = ({ children, navbar, className = "" }) => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <div className="flex-1">
      {navbar}
      <div className={classnames("mx-auto max-w-6xl px-6 pt-6", [className])}>
        {children}
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
