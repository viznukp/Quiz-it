import React from "react";

import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useFetchQuizStats } from "hooks/reactQuery/useQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import SubNavItem from "./SubNavItem";

const QuizFilter = ({ isVisible = false }) => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();

  const { data: { stats = {} } = {} } = useFetchQuizStats();

  const history = useHistory();

  const handleFilterSubmit = status =>
    history.replace(buildUrl("", mergeLeft({ status }, queryParams)));

  return (
    isVisible && (
      <div className="flex flex-col gap-2 border-b py-2 pl-6">
        <SubNavItem
          count={stats.totalQuizzes}
          label={t("labels.all")}
          onClick={() => handleFilterSubmit("")}
        />
        <SubNavItem
          count={stats.publishedQuizzes}
          label={t("labels.published")}
          onClick={() => handleFilterSubmit("published")}
        />
        <SubNavItem
          count={stats.draftQuizzes}
          label={t("labels.draft")}
          onClick={() => handleFilterSubmit("draft")}
        />
      </div>
    )
  );
};

export default QuizFilter;
