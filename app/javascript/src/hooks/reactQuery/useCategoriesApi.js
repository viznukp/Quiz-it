import { useQuery, useMutation } from "react-query";

import categoriesApi from "apis/categories";

export const useFetchCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.fetch(),
  });

export const useCreateCategory = () => useMutation(categoriesApi.create);
