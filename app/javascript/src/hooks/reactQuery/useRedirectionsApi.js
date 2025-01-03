import { useQuery, useMutation } from "react-query";

import redirectionsApi from "apis/redirections";

export const useFetchRedirections = () =>
  useQuery({
    queryKey: ["redirections"],
    queryFn: () => redirectionsApi.fetch(),
  });

export const useCreateRedirection = () => useMutation(redirectionsApi.create);

export const useUpdateRedirection = () => useMutation(redirectionsApi.update);

export const useDestroyRedirection = () => useMutation(redirectionsApi.destroy);
