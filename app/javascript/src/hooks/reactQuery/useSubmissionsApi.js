import { useQuery } from "react-query";

import submissionsApi from "apis/submissions";

export const useFetchSubmissions = (slug, filters) =>
  useQuery({
    queryKey: ["quizzes", slug],
    queryFn: () => submissionsApi.fetch(slug, filters),
  });

export const useFetchResult = slug =>
  useQuery({
    queryKey: ["result", slug],
    queryFn: () => submissionsApi.fetchResult(slug),
  });
