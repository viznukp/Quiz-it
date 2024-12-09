import React from "react";

import { Typography } from "neetoui";
import PropTypes from "prop-types";

const NoData = ({ message }) => (
  <div className="flex h-64 items-center justify-center">
    <Typography style="h3" weight="semibold">
      {message}
    </Typography>
  </div>
);

NoData.propTypes = {
  message: PropTypes.string,
};

export default NoData;
