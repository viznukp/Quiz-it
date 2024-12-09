import React from "react";

import { Pagination as NeetoUIPagination } from "neetoui";
import PropTypes from "prop-types";
import { mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";

import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

const Pagination = ({
  page,
  pageSize,
  pageCount,
  pageNumberFromApi,
  className,
}) => {
  const history = useHistory();
  const queryParams = useQueryParams();

  const handlePageNavigation = page => {
    history.replace(buildUrl("", mergeLeft({ page }, queryParams)));
  };

  const handlePageNumber = () => {
    const pageToInteger = Number(page);
    const pageNumberFromApiToInteger = Number(pageNumberFromApi);

    return pageToInteger !== pageNumberFromApiToInteger
      ? pageNumberFromApiToInteger
      : pageToInteger;
  };

  return (
    <NeetoUIPagination
      className={className}
      count={pageCount}
      navigate={pageNumber => handlePageNavigation(pageNumber)}
      pageNo={handlePageNumber()}
      pageSize={Number(pageSize)}
    />
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageNumberFromApi: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Pagination;
