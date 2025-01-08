import React, { useState, useEffect } from "react";

import { Filter as FilterIcon } from "neetoicons";
import { Table, Typography, Button } from "neetoui";
import { mergeLeft, isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import { ColumnFilter, StatusTag } from "components/Admin/commons";
import {
  Container,
  NavBar,
  SearchBar,
  Pagination,
  NoData,
  ActiveFilters,
  ContentWrapper,
} from "components/commons";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_INDEX,
  QUIZ_TABS,
  QUIZ_TAB_IDS,
} from "components/constants";
import { useFetchSubmissions } from "hooks/reactQuery/useSubmissionsApi";
import useQueryParams from "hooks/useQueryParams";
import { utcToLocalTime } from "utils/dateTime";
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
  const [quizTitle, setQuizTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState(queryParams.name || "");
  const { page = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } =
    queryParams;
  const history = useHistory();

  const updateSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.replace(
      buildUrl(routes.index, mergeLeft({ name: searchTerm }, queryParams))
    );
  };

  const {
    data: { submissions = [], paginationData = {}, quiz } = {},
    isLoading,
  } = useFetchSubmissions(slug, mergeLeft({ pageSize }, queryParams));

  const transformSubmissionDataForTableDisplay = data =>
    data?.map(({ submission, user }) => ({
      key: submission.id,
      name: user.name,
      email: user.email,
      submissionDate: utcToLocalTime(submission.submissionDate),
      correctAnswers: submission.correctAnswersCount,
      wrongAnswers: submission.wrongAnswersCount,
      unanswered: submission.unansweredCount,
      questions: submission.totalQuestions,
      status: <StatusTag label={submission.status} primaryLabel="completed" />,
    }));

  useEffect(() => {
    if (quiz) {
      setQuizTitle(quiz);
    }
  }, [quiz]);

  useEffect(() => {
    if (isNil(queryParams.name)) setSearchTerm("");
  }, [queryParams]);

  return (
    <Container>
      <NavBar
        backButtonVisible
        isTabsEnabled
        activeTab={QUIZ_TAB_IDS.submissions}
        quizSlug={slug}
        tabs={QUIZ_TABS}
        title={quizTitle}
      />
      <ContentWrapper>
        {isEmpty(submissions) && isEmpty(queryParams) ? (
          <NoData
            isLoading={isLoading}
            message={t("messages.info.noEntityToShow", {
              entity: t("labels.submissionsLower"),
            })}
          />
        ) : (
          <>
            <div className="mb-3 flex justify-between gap-3">
              <Typography style="h3">{t("labels.allSubmissions")}</Typography>
              <SearchBar
                placeholder={t("messages.info.searchName")}
                searchTerm={searchTerm}
                setSearchTerm={updateSearchTerm}
              />
            </div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex gap-3">
                <Typography style="h4">
                  {t("labels.availableSubmissions", {
                    count: submissions?.length,
                  })}
                </Typography>
                <ActiveFilters filters={["email", "status", "name"]} />
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
                  tooltipProps={{
                    content: t("labels.filter"),
                    position: "top",
                  }}
                  onClick={() => setIsFilterPaneOpen(!isFilterPaneOpen)}
                />
              </div>
            </div>
            <Table
              rowSelection
              columnData={visibleColumns}
              scroll={{ x: "100%" }}
              rowData={
                submissions
                  ? transformSubmissionDataForTableDisplay(submissions)
                  : []
              }
            />
            <Pagination
              className="mt-3"
              page={page}
              pageCount={paginationData.count || 0}
              pageNumberFromApi={Number(paginationData.page)}
              pageSize={pageSize}
            />
            <Filter
              closeFilter={() => setIsFilterPaneOpen(false)}
              isOpen={isFilterPaneOpen}
            />
          </>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default SubmissionList;
