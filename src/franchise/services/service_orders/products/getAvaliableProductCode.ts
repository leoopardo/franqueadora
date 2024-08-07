import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "@franchise/services/queryKeys";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";

export const useGetAvaliableProductCode = () => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    { available_code: number } | null | undefined
  >(
    [QueryKeys.GET_AVALIABLE_PRODUCT_CODE, headers],
    async () => {
      const response = await apiPortalEvent.get(
        `/product/available_product_code`,
        {
          headers: { ...headers },
          params: { orderBy: "created_at", orderDirection: "desc" },
        }
      );

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
