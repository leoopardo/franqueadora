import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { QueryKeys } from "../queryKeys";
import {
  Total,
  terminalTotalParams,
  terminalTotalSchema,
} from "./__interfaces/totalizers.interface";

export const useTerminalTotals = (params: terminalTotalParams) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    Total | null | undefined
  >(
    [QueryKeys.GET_TERMINAL_TOTALS, params],
    async () => {
      const response = await apiFranquia.get(`/terminal/totalizers`, {
        headers: headers ?? {},
        params,
      });

      const parsedResponse = terminalTotalSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error(parsedResponse.error as any);
      }

      return parsedResponse.data;
    },
    { enabled: !!headers?.["AuthToken"] }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
