import { useQuery } from "react-query";

import quizzesApi from "apis/quizzes";

export const useFetchQuizzes = queryParams =>
  useQuery({
    queryKey: ["quizzes", queryParams],
    queryFn: () => quizzesApi.fetch(queryParams),
  });

export const useShowQuiz = queryParams =>
  useQuery({
    queryKey: ["quiz", queryParams],
    queryFn: () => quizzesApi.show(queryParams),
    cacheTime: 0,
  });

export const useFetchQuizStats = () =>
  useQuery({
    queryKey: ["quizStats"],
    queryFn: () => quizzesApi.fetchQuizStats(),
  });
