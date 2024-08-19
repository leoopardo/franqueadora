import { apiFranquia } from "@config/apiFranquia";
import { QueryKeys } from "@franchisor/services/queryKeys";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import {
  TerminalsSelectSchema,
  TerminalsSelectType,
} from "../__interfaces/selects.interface";

export const useTerminalsSelects = () => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    TerminalsSelectType | null | undefined
  >(
    [QueryKeys.GET_TERMINAL_SELECTS],
    async () => {
      const response = await apiFranquia.get(`/terminal/selects`, {
        headers: { ...headers },
      });

      const parsedResponse = TerminalsSelectSchema.safeParse(response.data);
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
