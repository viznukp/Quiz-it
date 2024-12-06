import React, { useState } from "react";

import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Container, NavBar, SearchBar } from "components/commons";
import useQueryParams from "hooks/useQueryParams";
import useQuizzesStore from "stores/useQuizzesStore";
import { buildUrl } from "utils/url";

import NewQuizPane from "./NewQuizPane";
import QuizList from "./QuizList";

const Dashboard = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();
  const { resultType } = useQuizzesStore();
  const [searchTerm, setSearchTerm] = useState(queryParams.quizName || "");
  const pageTitles = {
    all: t("pageTitles.allQuizzes"),
    published: t("pageTitles.publishedQuizzes"),
    draft: t("pageTitles.draftQuizzes"),
  };

  const updateSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.replace(
      buildUrl("", mergeLeft({ quizName: searchTerm }, queryParams))
    );
  };

  return (
    <Container
      navbar={
        <NavBar title={pageTitles[resultType]}>
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
