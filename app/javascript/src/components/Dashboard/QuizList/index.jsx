import React, { useEffect, useState } from "react";

import { Delete } from "neetoicons";
import { Table, Button, Dropdown, Typography } from "neetoui";
import { isEmpty, mergeLeft, find, propEq } from "ramda";
import { useTranslation, Trans } from "react-i18next";
import { useQueryClient } from "react-query";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import {
  PageLoader,
  ColumnFilter,
  StatusTag,
  NoData,
  Pagination,
  ActiveFilters,
  TruncatedLabel,
} from "components/commons";
import {
  QUIZ_STATUSES,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_INDEX,
} from "components/constants";
import { useFetchQuizzes } from "hooks/reactQuery/useQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import useQuizzesStore from "stores/useQuizzesStore";

import ActionList from "./ActionList";
import ConfirmationModal from "./ConfirmationModal";
import { QUIZ_TABLE_SCHEMA } from "./constants";
import Filter from "./Filter";
import SearchableCategorySelector from "./SearchableCategorySelector";

const QuizList = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const queryClient = useQueryClient();
  const { setResultType, setQuizCounts } = useQuizzesStore();
  const { page = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } =
    queryParams;
  const [selectedQuizzesIds, setSelectedQuizzesIds] = useState([]);
  const [selectedQuizzesSlugs, setSelectedQuizzesSlugs] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(QUIZ_TABLE_SCHEMA);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  const closeDeleteConfirmationModal = () =>
    setIsDeleteConfirmationModalOpen(false);

  const handleConfirmationMessage = () => {
    const selectedQuizCount = selectedQuizzesSlugs.length;

    if (selectedQuizCount === 0) return "";

    const entity =
      selectedQuizCount > 1
        ? t("labels.quiz", { count: selectedQuizCount })
        : find(propEq(selectedQuizzesSlugs[0], "slug"))(quizzes).name;

    return (
      <Trans
        components={{ strong: <strong /> }}
        i18nKey="messages.warnings.beforeDelete"
        values={{ entity }}
      />
    );
  };

  const transformQuizDataForTableDisplay = (quizzes, reloadQuizzes) =>
    quizzes?.map(
      ({ id, name, submissionsCount, status, createdOn, category, slug }) => ({
        id,
        slug,
        key: id,
        name: (
          <TruncatedLabel
            isLink
            label={name}
            pathForLink={routes.quiz.questions.replace(":slug", slug)}
          />
        ),
        submissionsCount,
        status: <StatusTag label={status} primaryLabel="published" />,
        category,
        createdOn,
        actions: (
          <ActionList
            quizName={name}
            reloadQuizzes={reloadQuizzes}
            slug={slug}
            status={status}
          />
        ),
      })
    );

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setSelectedQuizzesSlugs(selectedRows.map(row => row.slug));
    setSelectedQuizzesIds(selectedRowKeys);
  };

  const handleResetAfterAction = () => {
    reloadQuizzes();
    setSelectedQuizzesIds([]);
    setSelectedQuizzesSlugs([]);
    queryClient.invalidateQueries("categories");
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
    data: {
      quizzes,
      totalQuizzes = 0,
      draftQuizzes = 0,
      publishedQuizzes = 0,
      paginationData = {},
      resultType = "all",
    } = {},
    isLoading,
    refetch: reloadQuizzes,
  } = useFetchQuizzes({ filters: mergeLeft({ pageSize }, queryParams) });

  useEffect(() => {
    setResultType(resultType);
    setSelectedQuizzesIds([]);
    setSelectedQuizzesSlugs([]);
    setQuizCounts({ totalQuizzes, draftQuizzes, publishedQuizzes });
  }, [quizzes]);

  if (isLoading) return <PageLoader className="h-64" />;

  return isEmpty(quizzes) && isEmpty(queryParams) ? (
    <NoData
      message={t("messages.info.noEntityToShow", {
        entity: t("labels.quizzesLower"),
      })}
    />
  ) : (
    <>
      <div className="mb-3 flex justify-between gap-3">
        <div className="flex flex-col gap-3">
          {!isEmpty(selectedQuizzesSlugs) && (
            <div className="flex gap-3">
              <Dropdown
                appendTo={() => document.body}
                buttonStyle="secondary"
                className="border"
                label={t("labels.changeCategory")}
              >
                <SearchableCategorySelector
                  onSelect={selectedCategory => {
                    handleUpdateMultipleQuizzes({
                      categoryId: selectedCategory,
                    });
                  }}
                />
              </Dropdown>
              <Dropdown
                appendTo={() => document.body}
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
                onClick={() => setIsDeleteConfirmationModalOpen(true)}
              />
            </div>
          )}
          <div className="mb-3 flex items-center gap-3">
            <Typography style="h4">
              {selectedQuizzesIds.length > 0
                ? t("labels.selectedQuiz", {
                    count: selectedQuizzesIds.length,
                    total: quizzes?.length,
                  })
                : t("labels.quiz", { count: quizzes?.length })}
            </Typography>
            <ActiveFilters filters={["category", "status", "quizName"]} />
          </div>
        </div>
        <div className="flex gap-2">
          <ColumnFilter
            schema={QUIZ_TABLE_SCHEMA}
            setVisibleColumns={setVisibleColumns}
          />
          <Filter />
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
        page={Number(page)}
        pageCount={paginationData.count}
        pageNumberFromApi={Number(paginationData.page)}
        pageSize={Number(pageSize)}
      />
      <ConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        primaryButtonLabel={t("labels.confirmDelete")}
        primaryButtonStyle="danger"
        primaryButtonAction={() => {
          closeDeleteConfirmationModal();
          handleDeleteMultipleQuizzes();
        }}
        onClose={closeDeleteConfirmationModal}
      >
        <div className="p-4">
          {handleConfirmationMessage()}
          <Typography className="mt-4">
            {t("messages.warnings.confirmDelete", {
              count: selectedQuizzesSlugs.length,
            })}
          </Typography>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default QuizList;
