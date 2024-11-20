import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => (
  <div className={classnames("mx-auto max-w-6xl px-6", [className])}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
