import React from "react";

import { useTranslation } from "react-i18next";

import { useFetchQuizStats } from "hooks/reactQuery/useQuizzesApi";

import SubNavItem from "./SubNavItem";

const QuizFilter = ({ isVisible = false }) => {
  const { t } = useTranslation();

  const { data: { stats = {} } = {} } = useFetchQuizStats();

  return (
    isVisible && (
      <div className="flex flex-col gap-2 border-b py-2 pl-6">
        <SubNavItem count={stats.totalQuizzes} label={t("labels.all")} />
        <SubNavItem
          count={stats.publishedQuizzes}
          label={t("labels.published")}
        />
        <SubNavItem count={stats.draftQuizzes} label={t("labels.draft")} />
      </div>
    )
  );
};

export default QuizFilter;
