import { useQuery, useMutation } from "react-query";

import organizationApi from "apis/organization";

export const useShowOrganization = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: () => organizationApi.show(),
  });

export const useUpdateOrganization = () => useMutation(organizationApi.update);
