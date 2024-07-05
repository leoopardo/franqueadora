import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { Promoter, PromotersParams } from "./__interfaces/promoters.interface";
import { QueryKeys } from "../queryKeys";

export const useListPromoters = (params: PromotersParams) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<Promoter> | null | undefined
  >(
    [QueryKeys.LIST_PROMOTERS, params],
    async () => {
      const response = await apiFranquia.get(`/promoter/all`, {
        headers: {
          ...headers,
          Referer: "https://backoffice.develop.pdv365.com.br",
        },
        params: { ...params, orderBy: "created_at", orderDirection: "desc" }
      });
      return response.data;
    },
    { enabled: headers && headers["AuthToken"] ? true : false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
