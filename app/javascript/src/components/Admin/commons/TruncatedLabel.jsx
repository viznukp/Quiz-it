import React, { useState, useRef, useEffect } from "react";

import classNames from "classnames";
import { Tooltip, Typography } from "neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TruncatedLabel = ({
  label,
  isLink = false,
  className,
  typographyStyle = "body1",
  pathForLink = "",
}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [label]);

  return (
    <Tooltip content={label} disabled={!isTruncated} position="top">
      {isLink ? (
        <Link
          ref={textRef}
          style={{ maxWidth: "100%" }}
          to={pathForLink}
          className={classNames(
            "block truncate text-black hover:text-blue-600",
            [className]
          )}
        >
          {label}
        </Link>
      ) : (
        <Typography
          className={classNames("block truncate", [className])}
          ref={textRef}
          style={typographyStyle}
        >
          {label}
        </Typography>
      )}
    </Tooltip>
  );
};

TruncatedLabel.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  isLink: PropTypes.bool,
  typographyStyle: PropTypes.string,
  pathForLink: PropTypes.string,
};

export default TruncatedLabel;
