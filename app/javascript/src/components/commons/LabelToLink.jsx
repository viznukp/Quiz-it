import React, { useState, useRef, useEffect } from "react";

import { Tooltip } from "neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LabelToLink = ({ label, pathTo }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [label]);

  return (
    <Tooltip content={label} disabled={!isTruncated} position="top">
      <Link
        className="block truncate text-black hover:text-blue-600"
        ref={textRef}
        style={{ maxWidth: "100%" }}
        to={pathTo}
      >
        {label}
      </Link>
    </Tooltip>
  );
};

LabelToLink.propTypes = {
  label: PropTypes.string,
  pathTo: PropTypes.string,
};

export default LabelToLink;
