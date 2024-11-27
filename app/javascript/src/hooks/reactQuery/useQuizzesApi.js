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
  });

export const useFetchQuestion = (slug, id) =>
  useQuery({
    queryKey: ["question", slug, id],
    queryFn: () => quizzesApi.fetchQuestion(slug, id),
    staleTime: 0,
    cacheTime: 0,
  });
