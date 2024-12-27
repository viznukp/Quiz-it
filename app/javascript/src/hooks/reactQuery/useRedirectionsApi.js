import { useQuery } from "react-query";

import redirectionsApi from "apis/redirections";

export const useFetchRedirections = () =>
  useQuery({
    queryKey: ["redirections"],
    queryFn: () => redirectionsApi.fetch(),
  });
