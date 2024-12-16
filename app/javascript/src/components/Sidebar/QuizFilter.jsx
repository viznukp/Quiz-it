import React from "react";

import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { DEFAULT_PAGE_SIZE } from "components/constants";
import { useFetchQuizzes } from "hooks/reactQuery/useQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import SubNavItem from "./SubNavItem";

const QuizFilter = ({ isVisible = false }) => {
  const STATUSES = { ALL: "", PUBLISHED: "published", DRAFT: "draft" };

  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();
  const { status = STATUSES.ALL } = queryParams;
  const { pageSize = DEFAULT_PAGE_SIZE } = queryParams;

  const { data: { totalQuizzes, draftQuizzes, publishedQuizzes } = {} } =
    useFetchQuizzes({ filters: mergeLeft({ pageSize }, queryParams) });

  const handleFilterSubmit = status =>
    history.replace(buildUrl("", { pageSize, status }));

  return (
    isVisible && (
      <div className="flex flex-col gap-2 border-b py-2 pl-6">
        <SubNavItem
          count={totalQuizzes}
          isActive={status === STATUSES.ALL}
          label={t("labels.all")}
          onClick={() => handleFilterSubmit(STATUSES.ALL)}
        />
        <SubNavItem
          count={publishedQuizzes}
          isActive={status === STATUSES.PUBLISHED}
          label={t("labels.published")}
          onClick={() => handleFilterSubmit(STATUSES.PUBLISHED)}
        />
        <SubNavItem
          count={draftQuizzes}
          isActive={status === STATUSES.DRAFT}
          label={t("labels.draft")}
          onClick={() => handleFilterSubmit(STATUSES.DRAFT)}
        />
      </div>
    )
  );
};

export default QuizFilter;
