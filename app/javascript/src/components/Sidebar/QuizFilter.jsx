import React from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { DEFAULT_PAGE_SIZE } from "components/constants";
import useQueryParams from "hooks/useQueryParams";
import useQuizzesStore from "stores/useQuizzesStore";
import { buildUrl } from "utils/url";

import SubNavItem from "./SubNavItem";

const QuizFilter = ({ isVisible = false }) => {
  const STATUSES = { ALL: "", PUBLISHED: "published", DRAFT: "draft" };

  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();
  const { quizCounts } = useQuizzesStore();
  const { status = STATUSES.ALL } = queryParams;
  const { pageSize = DEFAULT_PAGE_SIZE } = queryParams;
  const {
    totalQuizzes = 0,
    draftQuizzes = 0,
    publishedQuizzes = 0,
  } = quizCounts;

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
