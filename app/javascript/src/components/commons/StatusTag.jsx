import React from "react";

import { capitalize } from "neetocist";
import { Tag } from "neetoui";
import PropTypes from "prop-types";

const StatusTag = ({ label = "", primaryLabel = "" }) => (
  <Tag
    label={capitalize(label)}
    style={label === primaryLabel ? "info" : "warning"}
  />
);

StatusTag.propTypes = {
  label: PropTypes.string,
  primaryLabel: PropTypes.string,
};

export default StatusTag;
