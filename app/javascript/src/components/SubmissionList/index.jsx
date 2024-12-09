import React, { useState } from "react";

import { Filter as FilterIcon } from "neetoicons";
import { Table, Typography, Button } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import {
  Container,
  NavBar,
  PageLoader,
  StatusTag,
  ColumnFilter,
  SearchBar,
  Pagination,
} from "components/commons";
import { TAB_IDS } from "components/commons/NavBar/constants";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "components/constants";
import { useFetchSubmissions } from "hooks/reactQuery/useSubmissionsApi";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import { SUBMISSION_TABLE_SCHEMA } from "./constants";
import Filter from "./Filter";
import ReportDownloader from "./ReportDownloader";

const SubmissionList = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const queryParams = useQueryParams();
  const [visibleColumns, setVisibleColumns] = useState(SUBMISSION_TABLE_SCHEMA);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(queryParams.quizName || "");
  const { page = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } =
    queryParams;
  const history = useHistory();

  const updateSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.replace(buildUrl("", mergeLeft({ name: searchTerm }, queryParams)));
  };

  const {
    data: { submissions = [], paginationData = {}, quiz = "" } = {},
    isLoading,
  } = useFetchSubmissions(slug, mergeLeft({ pageSize }, queryParams));

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
          backButtonVisible
          isTabsEnabled
          activeTab={TAB_IDS.submissions}
          quizSlug={slug}
          title={quiz}
        />
      }
    >
      <div className="mb-3 flex justify-between gap-3">
        <Typography style="h3">{t("labels.allSubmissions")}</Typography>
        <SearchBar
          placeholder={t("messages.info.searchName")}
          searchTerm={searchTerm}
          setSearchTerm={updateSearchTerm}
        />
      </div>
      <div className="mb-3 flex justify-between gap-3">
        <div className="mb-3 flex gap-3">
          <Typography style="h4">
            {t("labels.availableSubmissions", {
              count: submissions?.length,
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
            tooltipProps={{ content: t("labels.filter"), position: "top" }}
            onClick={() => setIsFilterPaneOpen(!isFilterPaneOpen)}
          />
        </div>
      </div>
      <Table
        rowSelection
        columnData={visibleColumns}
        scroll={{ x: "100%" }}
        rowData={
          submissions ? transformSubmissionDataForTableDisplay(submissions) : []
        }
      />
      <Pagination
        className="mt-3"
        page={page}
        pageCount={paginationData.count}
        pageNumberFromApi={Number(paginationData.page)}
        pageSize={pageSize}
      />
      <Filter
        closeFilter={() => setIsFilterPaneOpen(false)}
        isOpen={isFilterPaneOpen}
      />
    </Container>
  );
};

export default SubmissionList;
