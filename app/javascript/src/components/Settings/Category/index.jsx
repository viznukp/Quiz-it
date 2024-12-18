import React from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { Container, ContentWrapper, NavBar } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";

import Card from "./Card";

import { SETTINGS_TABS, SETTINGS_TAB_IDS } from "../constants";

const Category = () => {
  const { t } = useTranslation();

  const { data: { categories = [] } = {} } = useFetchCategories();

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
        <div className="flex flex-col gap-3">
          {categories.map(category => (
            <Card key={category.id} {...category} />
          ))}
        </div>
      </ContentWrapper>
    </Container>
  );
};

export default Category;
