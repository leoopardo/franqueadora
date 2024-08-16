import qs from "qs";
import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { QueryKeys } from "../queryKeys";
import { Terminal } from "./__interfaces/terminals.interface";

export const useGetTerminalById = (id: string) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    Terminal | null | undefined
  >(
    [QueryKeys.GET_TERMINAL_BY_ID, id],
    async () => {
      const response = await apiFranquia.get(`/terminal/${id}`, {
        headers: {
          ...headers,
        },
        params: { orderBy: "created_at", orderDirection: "desc" },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: false });
        },
      });
      return response.data;
    },
    {
      enabled: headers && headers["AuthToken"] ? true : false,
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
