import React from "react";

import { Link } from "react-router-dom/cjs/react-router-dom";

const LabelToLink = ({ label, pathTo, truncateAfter }) => {
  const truncatedLabel =
    truncateAfter && label.length > truncateAfter
      ? `${label.slice(0, truncateAfter)}...`
      : label;

  return (
    <Link className="text-black hover:text-blue-600" to={pathTo}>
      {truncatedLabel}
    </Link>
  );
};

export default LabelToLink;
