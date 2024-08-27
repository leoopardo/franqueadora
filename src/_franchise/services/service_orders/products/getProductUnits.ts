import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "../../queryKeys";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import ResponseI from "../../__interfaces/response.interface";

export const useGetUnits = () => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    | ResponseI<{
        active: boolean;
        id: string;
        key: string;
        name: string;
      }>
    | null
    | undefined
  >(
    [QueryKeys.GET_UNITS_LIST, headers],
    async () => {
      const response = await apiPortalEvent.get(`/product-unit`, {
        headers: { ...headers },
        params: { orderBy: "created_at", orderDirection: "desc" },
      });

      return response.data;
    },
    {
      enabled: headers && headers["AuthToken"] ? true : false,
      refetchOnWindowFocus: true,
    }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
