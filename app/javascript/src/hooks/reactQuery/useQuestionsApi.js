import { useQuery } from "react-query";

import questionsApi from "apis/questions";

export const useCloneQuizzes = id =>
  useQuery({
    queryKey: ["quizzes", id],
    queryFn: () => questionsApi.clone(id),
  });

export const useShowQuestion = (slug, id) =>
  useQuery({
    queryKey: ["question", slug, id],
    queryFn: () => questionsApi.show({ slug, id }),
    staleTime: 0,
    cacheTime: 0,
  });
