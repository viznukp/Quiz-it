import { useQuery } from "react-query";

import publicApi from "apis/public";

export const useFetchQuizzes = queryParams =>
  useQuery({
    queryKey: ["quizzesPublic", queryParams],
    queryFn: () => publicApi.fetch(queryParams),
  });

export const useShowQuiz = queryParams =>
  useQuery({
    queryKey: ["quiz", queryParams],
    queryFn: () => publicApi.show(queryParams),
    cacheTime: 0,
  });
