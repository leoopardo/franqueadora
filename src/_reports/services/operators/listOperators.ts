import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { operatorParams, operatorResponseSchema, operatorType } from "./__interfaces/operator.interface";

export const useListOperators = (params: operatorParams) => {
  const { headers } = useReportsAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<operatorType> | null | undefined
  >(
    [QueryKeys.LIST_OPERATORS, params],
    async () => {
      const response = await apiReports.get(`/operators`, {
        headers: { ...headers },
        params: { ...params },
      });
      const parsedResponse = operatorResponseSchema.safeParse(response.data);
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
