import { useQuery, useMutation } from "react-query";

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
    cacheTime: 0,
  });

export const useCreateQuiz = () => useMutation(quizzesApi.create);

export const useUpdateQuiz = () => useMutation(quizzesApi.update);

export const useDeleteQuiz = () => useMutation(quizzesApi.destroy);

export const useCloneQuiz = () => useMutation(quizzesApi.clone);
