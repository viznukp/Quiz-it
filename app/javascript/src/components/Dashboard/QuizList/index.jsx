import React, { useState } from "react";

import { Delete } from "neetoicons";
import { Table, Button, Dropdown, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useFetchQuizzes } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import quizzesApi from "apis/quizzes";
import { LabelToLink, PageLoader } from "components/commons";
import { QUIZ_STATUSES } from "components/constants";
import { dateFromTimeStamp } from "utils/dateTime";

import ActionList from "./ActionList";
import StatusTag from "./StatusTag";

import { QUIZ_TABLE_SCHEMA } from "../constants";

const QuizList = () => {
  const { t } = useTranslation();
  const [selectedQuizzesIds, setSelectedQuizzesIds] = useState([]);
  const [selectedQuizzesSlugs, setSelectedQuizzesSlugs] = useState([]);

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
    data: quizzes = {},
    isLoading,
    refetch: reloadQuizzes,
  } = useFetchQuizzes();

  if (isLoading) return <PageLoader className="h-64" />;

  return (
    <>
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
      <Table
        rowSelection
        columnData={QUIZ_TABLE_SCHEMA}
        selectedRowKeys={selectedQuizzesIds}
        rowData={
          quizzes
            ? transformQuizDataForTableDisplay(quizzes, reloadQuizzes)
            : []
        }
        onRowSelect={handleRowSelection}
      />
    </>
  );
};

export default QuizList;
