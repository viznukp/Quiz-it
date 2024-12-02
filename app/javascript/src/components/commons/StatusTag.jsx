import React from "react";

import { capitalize } from "neetocist";
import { Tag } from "neetoui";

const StatusTag = ({ label = "", primaryLabel = "" }) => (
  <Tag
    label={capitalize(label)}
    style={label === primaryLabel ? "info" : "warning"}
  />
);

export default StatusTag;
