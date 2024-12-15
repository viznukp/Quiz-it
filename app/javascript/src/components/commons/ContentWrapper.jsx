import React from "react";

import classNames from "classnames";

const ContentWrapper = ({ className, children }) => (
  <div className="w-full flex-1 overflow-y-auto">
    <div className={classNames("mx-auto max-w-6xl px-6 pt-6", className)}>
      {children}
    </div>
  </div>
);

export default ContentWrapper;
