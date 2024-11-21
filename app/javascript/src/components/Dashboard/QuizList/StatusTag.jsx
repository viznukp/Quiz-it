import React from "react";

import { Tag } from "neetoui";

const StatusTag = ({ label, primaryLabel }) => (
  <Tag label={label} style={label === primaryLabel ? "info" : "warning"} />
);

export default StatusTag;
