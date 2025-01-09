import React, { useState, useEffect, useRef } from "react";

import { Button } from "neetoui";
import { mergeLeft, isEmpty, isNil } from "ramda";
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
import { COLORS } from "./constants";
import Filter from "./Filter";

const Home = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const queryParams = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(queryParams.quizName || "");
  const [organizationName, setOrganizationName] = useState("");
  const { page = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE_PUBLIC } =
    queryParams;
  const colorIndex = useRef(0);

  const generateColor = (currentCategory, index) => {
    if (index === 0 || currentCategory !== quizzes[index - 1].category) {
      colorIndex.current = (colorIndex.current + 1) % COLORS.length;
    }

    return COLORS[colorIndex.current];
  };

  const updateSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.replace(
      buildUrl(routes.index, mergeLeft({ quizName: searchTerm }, queryParams))
    );
  };

  const {
    data: { organization, quizzes = [], paginationData } = {},
    isLoading,
  } = useFetchQuizzes({ filters: mergeLeft({ pageSize }, queryParams) });

  useEffect(() => {
    if (organization) setOrganizationName(organization);
  }, [organization]);

  useEffect(() => {
    if (isNil(queryParams.quizName)) setSearchTerm("");
  }, [queryParams]);

  return (
    <Container sideBarDisabled>
      <NavBar title={organizationName}>
        <Button
          label={t("labels.loginAsAdmin")}
          onClick={() =>
            history.push(isLoggedIn() ? routes.root : routes.admin.login)
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
            isLoading={isLoading}
            message={t("messages.info.noEntityToShow", {
              entity: t("labels.quizzesLower"),
            })}
          />
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3">
              {quizzes?.map((quiz, index) => (
                <Card
                  key={quiz.id}
                  {...quiz}
                  color={generateColor(quiz.category, index)}
                />
              ))}
            </div>
            <Pagination
              className="mt-12"
              page={Number(page)}
              pageCount={Number(paginationData.count)}
              pageNumberFromApi={Number(paginationData.page)}
              pageSize={pageSize}
            />
          </>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default Home;
