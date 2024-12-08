import React, { useState } from "react";

import { Button } from "neetoui";
import { mergeLeft, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useFetchQuizzesPublic } from "src/hooks/reactQuery/useQuizzesApi";
import routes from "src/routes";

import {
  Container,
  NavBar,
  PageLoader,
  SearchBar,
  NoData,
} from "components/commons";
import useQueryParams from "hooks/useQueryParams";
import { buildUrl } from "utils/url";

import Card from "./Card";
import Filter from "./Filter";

const PublicPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(queryParams.quizName || "");

  const updateSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.replace(
      buildUrl("", mergeLeft({ quizName: searchTerm }, queryParams))
    );
  };

  const { data = {}, isLoading } = useFetchQuizzesPublic({
    filters: queryParams,
  });
  const { organization, quizzes = [] } = data;

  if (isLoading) return <PageLoader className="h-64" />;

  return (
    <Container
      navbar={
        <NavBar title={organization}>
          <Button
            label="Login as admin"
            onClick={() => history.push(routes.login)}
          />
        </NavBar>
      }
    >
      <div className="mb-8 mt-12 flex w-full justify-center">
        <div className="flex gap-3">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={updateSearchTerm}
            placeholder={t("messages.info.searchFor", {
              entity: t("labels.quizzesLower"),
            })}
          />
          <Filter />
        </div>
      </div>
      {isEmpty(quizzes) ? (
        <NoData
          message={t("messages.info.noEntityToShow", {
            entity: t("labels.quizzesLower"),
          })}
        />
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {quizzes?.map(quiz => (
            <Card key={quiz.id} {...quiz} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default PublicPage;
