import React from "react";

import { Table } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom";

import { Container, NavBar, PageLoader, StatusTag } from "components/commons";
import { TAB_IDS } from "components/commons/NavBar/constants";
import { useFetchSubmissions } from "hooks/reactQuery/useSubmissionsApi";

import { SUBMISSION_TABLE_SCHEMA } from "./constants";

const SubmissionList = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

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
