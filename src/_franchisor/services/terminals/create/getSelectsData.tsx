import { useQuery } from "react-query";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import {
  TerminalsSelectSchema,
  TerminalsSelectType,
} from "../__interfaces/selects.interface";
import { QueryKeys } from "../../queryKeys";
import { apiFranquia } from "@config/apiFranquia";

export const useTerminalsSelects = () => {
  const { headers } = useFranchisorAuth();
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
