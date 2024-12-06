import React, { useEffect, useState } from "react";

import { Delete, Filter as FilterIcon } from "neetoicons";
import { Table, Button, Dropdown, Typography, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import {
  LabelToLink,
  PageLoader,
  ColumnFilter,
  StatusTag,
  NoData,
} from "components/commons";
import {
  QUIZ_STATUSES,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_INDEX,
} from "components/constants";
import { useFetchQuizzes } from "hooks/reactQuery/useQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import useQuizzesStore from "stores/useQuizzesStore";
import { dateFromTimeStamp } from "utils/dateTime";
import { buildUrl } from "utils/url";

import ActionList from "./ActionList";
import CategorySelector from "./CategorySelector";
import { QUIZ_TABLE_SCHEMA } from "./constants";
import Filter from "./Filter";

const QuizList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const queryParams = useQueryParams();
  const { setResultType } = useQuizzesStore();
  const { page = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } =
    queryParams;
  const [selectedQuizzesIds, setSelectedQuizzesIds] = useState([]);
  const [selectedQuizzesSlugs, setSelectedQuizzesSlugs] = useState([]);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(QUIZ_TABLE_SCHEMA);

  const handlePageNavigation = page => {
    history.replace(buildUrl("", mergeLeft({ page }, queryParams)));
  };

  const handlePageNumber = () => {
    const currentPage = Number(page);
    const pageFromApi = Number(paginationData.page);

    return currentPage !== pageFromApi ? pageFromApi : currentPage;
  };

  const transformQuizDataForTableDisplay = (quizzes, reloadQuizzes) =>
    quizzes?.map(({ id, name, status, updatedAt, category, slug }) => ({
      id,
      slug,
      key: id,
      name: (
        <LabelToLink
          label={name}
          pathTo={routes.quiz.questions.replace(":slug", slug)}
          truncateAfter={20}
        />
      ),
      status: <StatusTag label={status} primaryLabel="published" />,
      category,
      createdOn: dateFromTimeStamp(updatedAt),
      actions: (
        <ActionList
          quizName={name}
          reloadQuizzes={reloadQuizzes}
          slug={slug}
          status={status}
        />
      ),
    }));

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setSelectedQuizzesSlugs(selectedRows.map(row => row.slug));
    setSelectedQuizzesIds(selectedRowKeys);
  };

  const handleResetAfterAction = () => {
    reloadQuizzes();
    setSelectedQuizzesIds([]);
    setSelectedQuizzesSlugs([]);
  };

  const handleDeleteMultipleQuizzes = async () => {
    try {
      await quizzesApi.deleteMultiple(selectedQuizzesSlugs);
      handleResetAfterAction();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleUpdateMultipleQuizzes = async updateParams => {
    try {
      await quizzesApi.updateMultiple(selectedQuizzesSlugs, updateParams);
      handleResetAfterAction();
    } catch (error) {
      logger.error(error);
    }
  };

  const {
    data: { quizzes, paginationData = {}, resultType = "all" } = {},
    isLoading,
    refetch: reloadQuizzes,
  } = useFetchQuizzes({ filters: mergeLeft({ pageSize }, queryParams) });

  useEffect(() => {
    setResultType(resultType);
  }, [quizzes]);

  if (isLoading) return <PageLoader className="h-64" />;

  return isEmpty(quizzes) ? (
    <NoData
      message={t("messages.info.noEntityToShow", {
        entity: t("labels.quizzesLower"),
      })}
    />
  ) : (
    <>
      <div className="mb-3 flex justify-between gap-3">
        <div className="mb-3 flex gap-3">
          <Typography style="h4">
            {selectedQuizzesIds.length > 0
              ? t("messages.info.selectedRows", {
                  selected: selectedQuizzesIds.length,
                  total: quizzes.length,
                  entity: "quizzes",
                })
              : t("messages.info.availableQuizzes", {
                  count: quizzes.length,
                })}
          </Typography>
          {!isEmpty(selectedQuizzesSlugs) && (
            <div className="flex gap-3">
              <Dropdown
                buttonStyle="secondary"
                className="border"
                label={t("labels.changeCategory")}
              >
                <CategorySelector
                  onSelect={selectedCategory => {
                    handleUpdateMultipleQuizzes({ category: selectedCategory });
                  }}
                />
              </Dropdown>
              <Dropdown
                buttonStyle="secondary"
                className="border"
                label={t("labels.status")}
              >
                <div className="flex flex-col">
                  <Button
                    label={t("labels.publish")}
                    style="text"
                    onClick={() =>
                      handleUpdateMultipleQuizzes({
                        status: QUIZ_STATUSES.PUBLISHED.STATUS,
                      })
                    }
                  />
                  <Button
                    label={t("labels.draft")}
                    style="text"
                    onClick={() =>
                      handleUpdateMultipleQuizzes({
                        status: QUIZ_STATUSES.DRAFT.STATUS,
                      })
                    }
                  />
                </div>
              </Dropdown>
              <Button
                icon={Delete}
                label={t("labels.delete")}
                style="danger"
                onClick={handleDeleteMultipleQuizzes}
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <ColumnFilter
            schema={QUIZ_TABLE_SCHEMA}
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
        selectedRowKeys={selectedQuizzesIds}
        rowData={
          quizzes
            ? transformQuizDataForTableDisplay(quizzes, reloadQuizzes)
            : []
        }
        onRowSelect={handleRowSelection}
      />
      <Pagination
        className="mt-3"
        count={paginationData.count}
        navigate={pageNumber => handlePageNavigation(pageNumber)}
        pageNo={handlePageNumber()}
        pageSize={Number(pageSize)}
      />
      <Filter
        closeFilter={() => setIsFilterPaneOpen(false)}
        isOpen={isFilterPaneOpen}
      />
    </>
  );
};

export default QuizList;
