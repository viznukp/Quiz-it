import { useQuery } from "react-query";

import quizzesApi from "apis/quizzes";

export const useFetchQuizzes = queryParams =>
  useQuery({
    queryKey: ["quizzes", queryParams],
    queryFn: () => quizzesApi.fetch(queryParams),
  });

export const useFetchQuizzesPublic = queryParams =>
  useQuery({
    queryKey: ["quizzesPublic", queryParams],
    queryFn: () => quizzesApi.fetchPublic(queryParams),
    staleTime: 0,
    cacheTime: 0,
  });

export const useShowQuiz = queryParams =>
  useQuery({
    queryKey: ["quiz", queryParams],
    queryFn: () => quizzesApi.show(queryParams),
  });

export const useShowQuizWithoutAnswer = queryParams =>
  useQuery({
    queryKey: ["quiz", queryParams],
    queryFn: () => quizzesApi.showWithoutAnswer(queryParams),
  });

export const useFetchQuizStats = () =>
  useQuery({
    queryKey: ["quizStats"],
    queryFn: () => quizzesApi.fetchQuizStats(),
  });
