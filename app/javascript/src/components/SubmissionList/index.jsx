import React from "react";

import { Table } from "neetoui";
import { useTranslation } from "react-i18next";

import { Container, NavBar, PageLoader, StatusTag } from "components/commons";
import { useFetchSubmissions } from "hooks/reactQuery/useSubmissionsApi";

import { SUBMISSION_TABLE_SCHEMA } from "./constants";

const SubmissionList = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useFetchSubmissions();

  const transformSubmissionDataForTableDisplay = data =>
    data?.map(({ submission, user }) => ({
      key: submission.id,
      name: user.name,
      email: user.email,
      submissionDate: submission.submissionDate,
      correctAnswers: submission.correctAnswersCount,
      wrongAnswers: submission.wrongAnswersCount,
      unanswered: submission.unansweredCount,
      status: <StatusTag label={submission.status} primaryLabel="completed" />,
    }));

  if (isLoading) return <PageLoader fullScreen />;

  return (
    <Container navbar={<NavBar title={t("pageTitles.allSubmissions")} />}>
      <Table
        rowSelection
        columnData={SUBMISSION_TABLE_SCHEMA}
        rowData={
          data ? transformSubmissionDataForTableDisplay(data.submissions) : []
        }
        scroll={{
          x: "30%",
        }}
      />
    </Container>
  );
};

export default SubmissionList;
