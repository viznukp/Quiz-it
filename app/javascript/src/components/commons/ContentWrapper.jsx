import React from "react";

import classNames from "classnames";

import PageLoader from "./PageLoader";

const ContentWrapper = ({ className, isLoading = false, children }) => (
  <div className="w-full flex-1 overflow-y-auto">
    <div className={classNames("mx-auto max-w-6xl px-6 pt-6", className)}>
      {isLoading ? <PageLoader className="h-64" /> : children}
    </div>
  </div>
);

export default ContentWrapper;
