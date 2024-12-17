import { useQuery } from "react-query";

import submissionsApi from "apis/submissions";

export const useFetchSubmissions = (slug, filters) =>
  useQuery({
    queryKey: ["quizzes", slug, filters],
    queryFn: () => submissionsApi.fetch(slug, filters),
    cacheTime: 0,
  });

export const useFetchResult = (slug, userId) =>
  useQuery({
    queryKey: ["result", slug, userId],
    queryFn: () => submissionsApi.fetchResult(slug, userId),
  });
