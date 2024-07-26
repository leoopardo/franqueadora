import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { ClientParams, ClientType, clientResponseSchema } from "./__interfaces/clients.interface";

export const useListClients = (params: ClientParams) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<ClientType> | null | undefined
  >(
    [QueryKeys.LIST_CLIENTS, params],
    async () => {
      const response = await apiFranquia.get(`/client/all`, {
        headers: headers ?? {},
        params: { ...params, orderBy: "created_at", orderDirection: "desc" }
      });
      const parsedResponse = clientResponseSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error((parsedResponse.error as any));
      }

      return parsedResponse.data;
    },
    { enabled: headers && headers["AuthToken"] ? true : false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
