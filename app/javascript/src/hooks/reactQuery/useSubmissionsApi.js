import { useQuery, useMutation } from "react-query";

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

export const useCreateSubmission = () => useMutation(submissionsApi.create);

export const useGeneratePdf = () => useMutation(submissionsApi.generatePdf);

export const useDownloadPdf = () => useMutation(submissionsApi.downloadPdf);
