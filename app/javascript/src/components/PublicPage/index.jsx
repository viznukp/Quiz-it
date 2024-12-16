import React, { useState, useEffect } from "react";

import { Button } from "neetoui";
import { mergeLeft, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useFetchQuizzes } from "src/hooks/reactQuery/usePublicApi";
import routes from "src/routes";

import {
  Container,
  NavBar,
  SearchBar,
  NoData,
  Pagination,
  ActiveFilters,
  ContentWrapper,
} from "components/commons";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE_PUBLIC,
} from "components/constants";
import useQueryParams from "hooks/useQueryParams";
import { isLoggedIn } from "utils/auth";
import { buildUrl } from "utils/url";

import Card from "./Card";
import Filter from "./Filter";

const PublicPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(queryParams.quizName || "");
  const [organizationName, setOrganizationName] = useState("");
  const { page = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE_PUBLIC } =
    queryParams;

  const updateSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.replace(
      buildUrl("", mergeLeft({ quizName: searchTerm }, queryParams))
    );
  };

  const { data: { organization, quizzes = [], paginationData } = {} } =
    useFetchQuizzes({ filters: mergeLeft({ pageSize }, queryParams) });

  useEffect(() => {
    if (organization) setOrganizationName(organization);
  }, [organization]);

  return (
    <Container sideBarDisabled>
      <NavBar title={organizationName}>
        <Button
          label="Login as admin"
          onClick={() =>
            history.push(isLoggedIn() ? routes.root : routes.login)
          }
        />
      </NavBar>
      <ContentWrapper>
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
        <ActiveFilters className="mb-2" filters={["category", "quizName"]} />
        {isEmpty(quizzes) ? (
          <NoData
            className="rounded-xl bg-blue-50"
            message={t("messages.info.noEntityToShow", {
              entity: t("labels.quizzesLower"),
            })}
          />
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3">
              {quizzes?.map(quiz => (
                <Card key={quiz.id} {...quiz} />
              ))}
            </div>
            <Pagination
              className="mt-12"
              page={page}
              pageCount={paginationData.count}
              pageNumberFromApi={Number(paginationData.page)}
              pageSize={pageSize}
            />
          </>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default PublicPage;
