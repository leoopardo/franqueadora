import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import {
  Terminal,
  terminalParams,
  terminalResponseSchema,
} from "./__interfaces/terminals.interface";

export const useListTerminals = (params: terminalParams) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<Terminal> | null | undefined
  >(
    [QueryKeys.LIST_TERMINALS, params],
    async () => {
      const response = await apiFranquia.get(`/terminal/all`, {
        headers: headers ?? {},
        params: { ...params, orderBy: "created_at", orderDirection: "desc" },
      });

      const parsedResponse = terminalResponseSchema.safeParse(response.data);
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
