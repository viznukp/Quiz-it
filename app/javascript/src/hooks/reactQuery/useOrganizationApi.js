import { useQuery } from "react-query";

import organizationApi from "apis/organization";

export const useShowOrganization = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: () => organizationApi.show(),
  });
