import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import {
  waiterParams,
  waiterResponseSchema,
  waiterType,
} from "./__interfaces/waiter.interface";

export const useListWaiters = (params: waiterParams) => {
  const { headers } = useReportsAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<waiterType> | null | undefined
  >(
    [QueryKeys.LIST_WAITERS, params],
    async () => {
      const response = await apiReports.get(`/waiters`, {
        headers: { ...headers },
        params: { ...params },
      });
      const parsedResponse = waiterResponseSchema.safeParse(response.data);
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
