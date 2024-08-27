import { useQuery } from "react-query";
import {
  PendingType,
  pendingTerminalParams,
  pendingTerminalResponseSchema,
} from "../__interfaces/pending.interface";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import ResponseI from "../../__interfaces/response.interface";
import { QueryKeys } from "../../queryKeys";
import { apiFranquia } from "@config/apiFranquia";
export const useListPending = (params: pendingTerminalParams) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<PendingType> | null | undefined
  >(
    [QueryKeys.LIST_PENDING_TERMINALS, params],
    async () => {
      const response = await apiFranquia.get(`/terminal/pending`, {
        headers: headers ?? {},
        params: { ...params, orderBy: "created_at", orderDirection: "desc" }
      });

      const parsedResponse = pendingTerminalResponseSchema.safeParse(
        response.data
      );
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
