import React from "react";

import classNames from "classnames";
import { Typography, Button } from "neetoui";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";

import PageLoader from "./PageLoader";

const NoData = ({
  message,
  buttonProps = {},
  isLoading = false,
  className = "",
}) =>
  isLoading ? (
    <PageLoader className="h-64" />
  ) : (
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
