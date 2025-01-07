import { useQuery } from "react-query";

import publicApi from "apis/public";

export const useFetchQuizzes = queryParams =>
  useQuery({
    queryKey: ["quizzesPublic", queryParams],
    queryFn: () => publicApi.fetchQuizzes(queryParams),
  });

export const useShowQuiz = queryParams =>
  useQuery({
    queryKey: ["quizPublic", queryParams],
    queryFn: () => publicApi.showQuiz(queryParams),
    retry: 0,
  });

export const useFetchQuestions = queryParams =>
  useQuery({
    queryKey: ["questionsPublic", queryParams],
    queryFn: () => publicApi.fetchQuestions(queryParams),
    retry: 0,
  });
