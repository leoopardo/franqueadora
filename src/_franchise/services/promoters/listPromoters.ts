import qs from "qs";
import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { Promoter, PromotersParams } from "./__interfaces/promoters.interface";

export const useListPromoters = (
  params: PromotersParams,
  isClient?: boolean
) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<Promoter> | null | undefined
  >(
    [QueryKeys.LIST_PROMOTERS, isClient ? undefined : params],
    async () => {
      const response = await apiFranquia.get(`/promoter`, {
        headers: {
          ...headers,
        },
        params: { orderBy: "created_at", orderDirection: "desc", ...params },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: false });
        },
      });
      return response.data;
    },
    {
      enabled: isClient
        ? false
        : headers && headers["AuthToken"]
          ? true
          : false,
      refetchOnWindowFocus: isClient ? false : true,
    }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
