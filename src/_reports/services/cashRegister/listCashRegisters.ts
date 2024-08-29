import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { cashRegisterParams, cashRegisterResponseSchema, cashRegisterType } from "./__interfaces/cashRegister.interface";

export const useListCashRegisters = (params: cashRegisterParams) => {
  const { headers } = useReportsAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<cashRegisterType> | null | undefined
  >(
    [QueryKeys.LIST_CASH_REGISTERS, params],
    async () => {
      const response = await apiReports.get(`/caixas`, {
        headers: { ...headers },
        params: { ...params },
      });
      const parsedResponse = cashRegisterResponseSchema.safeParse(
        response.data
      );
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
