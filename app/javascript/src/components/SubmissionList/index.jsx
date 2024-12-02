import React, { useState } from "react";

import { Table, Typography } from "neetoui";
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

import { SUBMISSION_TABLE_SCHEMA } from "./constants";

const SubmissionList = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [visibleColumns, setVisibleColumns] = useState(SUBMISSION_TABLE_SCHEMA);

  const { data, isLoading } = useFetchSubmissions(slug);

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
              count: data?.submissions.length,
            })}
          </Typography>
        </div>
        <div className="flex gap-2">
          <ColumnFilter
            schema={SUBMISSION_TABLE_SCHEMA}
            setVisibleColumns={setVisibleColumns}
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
    </Container>
  );
};

export default SubmissionList;
