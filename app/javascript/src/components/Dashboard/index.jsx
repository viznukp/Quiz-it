import React, { useState, useEffect } from "react";

import quizzesApi from "apis/quizzes";
import { Container } from "components/commons";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

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
      <div className="flex flex-col">
        {quizzes?.map(quiz => (
          <p key={quiz.id}>{quiz.name}</p>
        ))}
      </div>
    </Container>
  );
};
export default Dashboard;
