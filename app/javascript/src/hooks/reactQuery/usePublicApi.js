import { useQuery } from "react-query";

import publicApi from "apis/public";

export const useFetchQuizzes = queryParams =>
  useQuery({
    queryKey: ["quizzesPublic", queryParams],
    queryFn: () => publicApi.fetch(queryParams),
    staleTime: 0,
    cacheTime: 0,
  });
