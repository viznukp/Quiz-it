import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import PropTypes from "prop-types";

const NoData = ({ message, className = "" }) => (
  <div
    className={classNames("flex h-64 items-center justify-center", className)}
  >
    <Typography style="h3" weight="semibold">
      {message}
    </Typography>
  </div>
);

NoData.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default NoData;
