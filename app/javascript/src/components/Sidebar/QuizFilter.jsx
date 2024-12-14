import React from "react";

import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useFetchQuizStats } from "hooks/reactQuery/useQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import SubNavItem from "./SubNavItem";

const QuizFilter = ({ isVisible = false }) => {
  const STATUSES = { ALL: "all", PUBLISHED: "published", DRAFT: "draft" };

  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();
  const { status = STATUSES.ALL } = queryParams;

  const { data: { stats = {} } = {} } = useFetchQuizStats();

  const handleFilterSubmit = status =>
    history.replace(buildUrl("", mergeLeft({ status }, queryParams)));

  return (
    isVisible && (
      <div className="flex flex-col gap-2 border-b py-2 pl-6">
        <SubNavItem
          count={stats.totalQuizzes}
          isActive={status === STATUSES.ALL}
          label={t("labels.all")}
          onClick={() => handleFilterSubmit(STATUSES.ALL)}
        />
        <SubNavItem
          count={stats.publishedQuizzes}
          isActive={status === STATUSES.PUBLISHED}
          label={t("labels.published")}
          onClick={() => handleFilterSubmit(STATUSES.PUBLISHED)}
        />
        <SubNavItem
          count={stats.draftQuizzes}
          isActive={status === STATUSES.DRAFT}
          label={t("labels.draft")}
          onClick={() => handleFilterSubmit(STATUSES.DRAFT)}
        />
      </div>
    )
  );
};

export default QuizFilter;
