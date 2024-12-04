import { useQuery } from "react-query";

import organizationApi from "apis/organization";

export const useShowOrganization = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: () => organizationApi.show(),
    staleTime: 0,
    cacheTime: 0,
  });
