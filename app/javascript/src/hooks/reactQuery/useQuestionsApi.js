import { useQuery } from "react-query";

import questionsApi from "apis/questions";

export const useCloneQuizzes = id =>
  useQuery({
    queryKey: ["quizzes", id],
    queryFn: () => questionsApi.clone(id),
  });
