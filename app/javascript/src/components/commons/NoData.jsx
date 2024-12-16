import React from "react";

import classNames from "classnames";
import { Typography, Button } from "neetoui";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";

const NoData = ({ message, buttonProps = {}, className = "" }) => (
  <div
    className={classNames(
      "flex h-64 flex-col items-center justify-center gap-6",
      className
    )}
  >
    <Typography style="h3" weight="semibold">
      {message}
    </Typography>
    {!isEmpty(buttonProps) && <Button {...buttonProps} />}
  </div>
);

NoData.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  buttonProps: PropTypes.string,
};

export default NoData;
