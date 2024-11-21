import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import quizzesApi from "apis/quizzes";
import { Container, NavBar } from "components/commons";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { t } = useTranslation();

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.fetch();
      setQuizzes(response.data);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <Container>
      <NavBar backButtonVisible title={t("pageTitles.allQuizzes")} />
      <div className="flex flex-col">
        {quizzes?.map(quiz => (
          <p key={quiz.id}>{quiz.name}</p>
        ))}
      </div>
    </Container>
  );
};
export default Dashboard;
