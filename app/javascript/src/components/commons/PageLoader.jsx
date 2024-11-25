import React from "react";

import classNames from "classnames";
import { Spinner } from "neetoui";
import PropTypes from "prop-types";

const PageLoader = ({ fullScreen = false, className = "" }) => (
  <div
    className={classNames(
      "flex w-full items-center justify-center",
      {
        "h-screen": fullScreen,
      },
      className
    )}
  >
    <Spinner />
  </div>
);

PageLoader.propTypes = {
  fullScreen: PropTypes.bool,
};

export default PageLoader;
