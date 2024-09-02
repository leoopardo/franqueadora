import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import {
  courtesieParams,
  courtesieResponseSchema,
  courtesieType,
} from "./__interfaces/courtesies.interface";

export const useListCourtesies = (params: courtesieParams) => {
  const { headers } = useReportsAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<courtesieType> | null | undefined
  >(
    [QueryKeys.LIST_COURTESIES, params],
    async () => {
      const response = await apiReports.get(`/courtesies`, {
        headers: { ...headers },
        params: { ...params },
      });
      const parsedResponse = courtesieResponseSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error(parsedResponse.error as any);
      }

      return parsedResponse.data;
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
