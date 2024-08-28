import qs from "qs";
import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { QueryKeys } from "../queryKeys";
import { PromoterById } from "./__interfaces/promoter_by_id.interface";

export const useGetPromoterById = (id: string) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
  PromoterById | null | undefined
  >(
    [QueryKeys.GET_PROMOTER_BY_ID, id],
    async () => {
      const response = await apiFranquia.get(`/promoter/${id}`, {
        headers: {
          ...headers,
        },
        params: { orderBy: "created_at", orderDirection: "desc" },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: false });
        },
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
