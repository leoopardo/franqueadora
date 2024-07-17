import {
  Franchise,
  FranchiseParams,
  franchiseResponseSchema,
} from "@franchisor/services/franchises/__interfaces/franchises.interface";
import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";

export const useListFranchises = (
  params: FranchiseParams,
  franchise?: boolean
) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<Franchise> | null | undefined
  >(
    [QueryKeys.LIST_FRANCHISES, params],
    async () => {
      const response = await apiFranquia.get(`/admin/franchise`, {
        headers: { ...headers },
        params: { orderBy: "created_at", orderDirection: "desc", ...params },
      });
      const parsedResponse = franchiseResponseSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error(parsedResponse.error as any);
      }

      return parsedResponse.data;
    },
    {
      enabled: franchise && headers && headers["AuthToken"] ? true : false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
