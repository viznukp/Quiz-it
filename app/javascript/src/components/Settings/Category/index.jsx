import React, { useState, useEffect } from "react";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";
import { Container, ContentWrapper, NavBar } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";

import Card from "./Card";

import { SETTINGS_TABS, SETTINGS_TAB_IDS } from "../constants";

const Category = () => {
  const { t } = useTranslation();
  const [categoryList, setCategoryList] = useState([]);

  const { data: { categories = [] } = {} } = useFetchCategories();

  useEffect(() => {
    if (!isEmpty(categories)) setCategoryList(categories);
  }, [categories]);

  const fetchUpdatedOrder = list =>
    list.map((category, index) => ({
      id: category.id,
      sortOrder: index + 1,
    }));

  const handleUpdateOrder = async list => {
    try {
      setCategoryList(list);
      await categoriesApi.updateOrder(fetchUpdatedOrder(list));
    } catch (error) {
      logger.error(error);
    }
  };

  const handleOnDragEnd = ({ source, destination }) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const reorderedCategoryList = [...categoryList];
    const sourceItem = reorderedCategoryList.splice(source.index, 1);
    reorderedCategoryList.splice(destination.index, 0, sourceItem[0]);
    handleUpdateOrder(reorderedCategoryList);
  };

  return (
    <Container>
      <NavBar
        isTabsEnabled
        activeTab={SETTINGS_TAB_IDS.category}
        tabs={SETTINGS_TABS}
      />
      <ContentWrapper>
        <div className="flex flex-col gap-1">
          <Typography style="h2" weight="bold">
            {t("settings.categories.title")}
          </Typography>
          <Typography>{t("settings.categories.subTitle")}</Typography>
        </div>
        <div className="mt-4 flex justify-between pb-2">
          <Typography>
            {t("labels.category", { count: categories.length })}
          </Typography>
          <Button
            className="text-blue-500"
            icon={Plus}
            iconPosition="left"
            label={t("settings.categories.addNewCategory")}
            style="text"
          />
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppableArea">
            {provided => (
              <div
                className="flex flex-col gap-3"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {categoryList.map((category, index) => (
                  <Card key={category.id} {...category} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ContentWrapper>
    </Container>
  );
};

export default Category;
