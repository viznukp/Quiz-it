import { useQuery } from "react-query";

import categoriesApi from "apis/categories";

export const useFetchCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.fetch(),
  });
