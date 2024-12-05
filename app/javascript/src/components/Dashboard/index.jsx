import React from "react";

import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Container, NavBar, SearchBar } from "components/commons";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import NewQuizPane from "./NewQuizPane";
import QuizList from "./QuizList";

const Dashboard = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();

  const updateSearchTerm = searchTerm => {
    history.replace(
      buildUrl("", mergeLeft({ quizName: searchTerm }, queryParams))
    );
  };

  return (
    <Container
      navbar={
        <NavBar title={t("pageTitles.allQuizzes")}>
          <SearchBar
            setSearchTerm={updateSearchTerm}
            placeholder={t("messages.info.searchFor", {
              entity: t("labels.quizzesLower"),
            })}
          />
          <NewQuizPane />
        </NavBar>
      }
    >
      <QuizList />
    </Container>
  );
};
export default Dashboard;
