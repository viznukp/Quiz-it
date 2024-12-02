import { useQuery } from "react-query";

import submissionsApi from "apis/submissions";

export const useFetchSubmissions = () =>
  useQuery({
    queryKey: ["quizzes"],
    queryFn: () => submissionsApi.fetch(),
  });
