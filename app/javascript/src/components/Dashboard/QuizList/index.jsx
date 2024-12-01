import React, { useState } from "react";

import { Delete, Column, Filter as FilterIcon } from "neetoicons";
import {
  Table,
  Button,
  Dropdown,
  Typography,
  Checkbox,
  Pagination,
} from "neetoui";
import { isEmpty, without } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import { LabelToLink, PageLoader } from "components/commons";
import {
  QUIZ_STATUSES,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_INDEX,
} from "components/constants";
import { useFetchQuizzes } from "hooks/reactQuery/useQuizzesApi";
import { dateFromTimeStamp } from "utils/dateTime";

import ActionList from "./ActionList";
import CategorySelector from "./CategorySelector";
import { QUIZ_TABLE_SCHEMA } from "./constants";
import Filter from "./Filter";
import StatusTag from "./StatusTag";

const QuizList = () => {
  const { t } = useTranslation();
  const [selectedQuizzesIds, setSelectedQuizzesIds] = useState([]);
  const [selectedQuizzesSlugs, setSelectedQuizzesSlugs] = useState([]);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(QUIZ_TABLE_SCHEMA);
  const [columnsToHide, setColumnsToHide] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE_INDEX);

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

  const filterColumns = columns =>
    QUIZ_TABLE_SCHEMA.filter(column => !columns.includes(column.key));

  const handleColumnFilterChange = key => {
    const updatedColumnsToHide = columnsToHide.includes(key)
      ? without([key], columnsToHide)
      : [...columnsToHide, key];

    setColumnsToHide(updatedColumnsToHide);
    setVisibleColumns(filterColumns(updatedColumnsToHide));
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
    data: { quizzes = [], paginationData = {} } = {},
    isLoading,
    refetch: reloadQuizzes,
  } = useFetchQuizzes({
    filters: { ...filterParams, pageSize: DEFAULT_PAGE_SIZE, page },
  });

  if (isLoading) return <PageLoader className="h-64" />;

  return (
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
          <Dropdown buttonStyle="text" icon={Column}>
            <div className="flex flex-col gap-3 p-4">
              {QUIZ_TABLE_SCHEMA.map(
                ({
                  title,
                  key,
                  excludeFromColumnFilter,
                  isDisabledInColumnFilter,
                }) =>
                  !excludeFromColumnFilter && (
                    <Checkbox
                      checked={!columnsToHide.includes(key)}
                      disabled={isDisabledInColumnFilter}
                      key={key}
                      label={title}
                      value={key}
                      onChange={() => handleColumnFilterChange(key)}
                    />
                  )
              )}
            </div>
          </Dropdown>
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
        navigate={pageNumber => setPage(pageNumber)}
        pageNo={paginationData.page}
        pageSize={DEFAULT_PAGE_SIZE}
      />
      <Filter
        closeFilter={() => setIsFilterPaneOpen(false)}
        isOpen={isFilterPaneOpen}
        setFilterParams={setFilterParams}
      />
    </>
  );
};

export default QuizList;
