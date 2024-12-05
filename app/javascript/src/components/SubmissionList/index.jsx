import React, { useState } from "react";

import { Filter as FilterIcon } from "neetoicons";
import { Table, Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom";

import {
  Container,
  NavBar,
  PageLoader,
  StatusTag,
  ColumnFilter,
} from "components/commons";
import { TAB_IDS } from "components/commons/NavBar/constants";
import { useFetchSubmissions } from "hooks/reactQuery/useSubmissionsApi";
import useQueryParams from "hooks/useQueryParams";

import { SUBMISSION_TABLE_SCHEMA } from "./constants";
import Filter from "./Filter";
import ReportDownloader from "./ReportDownloader";

const SubmissionList = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const queryParams = useQueryParams();
  const [visibleColumns, setVisibleColumns] = useState(SUBMISSION_TABLE_SCHEMA);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  const { data, isLoading } = useFetchSubmissions(slug, queryParams);

  const transformSubmissionDataForTableDisplay = data =>
    data?.map(({ submission, user }) => ({
      key: submission.id,
      name: user.name,
      email: user.email,
      submissionDate: submission.submissionDate,
      correctAnswers: submission.correctAnswersCount,
      wrongAnswers: submission.wrongAnswersCount,
      unanswered: submission.unansweredCount,
      questions: submission.totalQuestions,
      status: <StatusTag label={submission.status} primaryLabel="completed" />,
    }));

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container
      navbar={
        <NavBar
          isTabsEnabled
          activeTab={TAB_IDS.submissions}
          quizSlug={slug}
          title={t("pageTitles.allSubmissions")}
        />
      }
    >
      <div className="mb-3 flex justify-between gap-3">
        <div className="mb-3 flex gap-3">
          <Typography style="h4">
            {t("labels.availableSubmissions", {
              count: data?.submissions?.length,
            })}
          </Typography>
        </div>
        <div className="flex gap-2">
          <ReportDownloader slug={slug} />
          <ColumnFilter
            schema={SUBMISSION_TABLE_SCHEMA}
            setVisibleColumns={setVisibleColumns}
          />
          <Button
            icon={FilterIcon}
            style="text"
            onClick={() => setIsFilterPaneOpen(!isFilterPaneOpen)}
          />
        </div>
      </div>
      <Table
        rowSelection
        columnData={visibleColumns}
        scroll={{ x: "100%" }}
        rowData={
          data ? transformSubmissionDataForTableDisplay(data.submissions) : []
        }
      />
      <Filter
        closeFilter={() => setIsFilterPaneOpen(false)}
        isOpen={isFilterPaneOpen}
      />
    </Container>
  );
};

export default SubmissionList;
