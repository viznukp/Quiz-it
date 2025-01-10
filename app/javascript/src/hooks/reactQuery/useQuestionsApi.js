import { useQuery, useMutation } from "react-query";

import questionsApi from "apis/questions";

export const useShowQuestion = (slug, id) =>
  useQuery({
    queryKey: ["question", slug, id],
    queryFn: () => questionsApi.show({ slug, id }),
    cacheTime: 0,
  });

export const useCreateQuestion = () => useMutation(questionsApi.create);

export const useDeleteQuestion = () => useMutation(questionsApi.destroy);

export const useEditQuestion = () => useMutation(questionsApi.update);

export const useCloneQuestion = () => useMutation(questionsApi.clone);
