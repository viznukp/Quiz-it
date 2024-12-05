import React, { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState(queryParams.quizName || "");

  const updateSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.replace(
      buildUrl("", mergeLeft({ quizName: searchTerm }, queryParams))
    );
  };

  return (
    <Container
      navbar={
        <NavBar title={t("pageTitles.allQuizzes")}>
          <SearchBar
            searchTerm={searchTerm}
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
