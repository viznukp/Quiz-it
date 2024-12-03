import { useQuery } from "react-query";

import submissionsApi from "apis/submissions";

export const useFetchSubmissions = slug =>
  useQuery({
    queryKey: ["quizzes", slug],
    queryFn: () => submissionsApi.fetch(slug),
  });

export const useFetchResult = slug =>
  useQuery({
    queryKey: ["result", slug],
    queryFn: () => submissionsApi.fetchResult(slug),
  });
