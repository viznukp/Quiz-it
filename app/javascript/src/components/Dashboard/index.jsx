import React, { useState, useEffect } from "react";

import { mergeLeft, isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import {
  Container,
  NavBar,
  SearchBar,
  ContentWrapper,
} from "components/commons";
import useQueryParams from "hooks/useQueryParams";
import useQuizzesStore from "stores/useQuizzesStore";
import { buildUrl } from "utils/url";

import { PAGE_TITLES } from "./constants";
import NewQuizPane from "./NewQuizPane";
import QuizList from "./QuizList";

const Dashboard = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const history = useHistory();
  const { resultType } = useQuizzesStore();
  const [searchTerm, setSearchTerm] = useState(queryParams.quizName || "");

  const updateSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.replace(
      buildUrl(routes.index, mergeLeft({ quizName: searchTerm }, queryParams))
    );
  };

  useEffect(() => {
    if (isNil(queryParams.quizName)) setSearchTerm("");
  }, [queryParams]);

  return (
    <Container>
      <NavBar title={PAGE_TITLES[resultType]}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={updateSearchTerm}
          placeholder={t("messages.info.searchFor", {
            entity: t("labels.quizzesLower"),
          })}
        />
        <NewQuizPane />
      </NavBar>
      <ContentWrapper>
        <QuizList />
      </ContentWrapper>
    </Container>
  );
};
export default Dashboard;
