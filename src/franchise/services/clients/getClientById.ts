import { ClientById } from "@franchisor/services/clients/__interfaces/client_by_id.interface";
import qs from "qs";
import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { QueryKeys } from "../queryKeys";

export const useGetClientById = (id: string) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ClientById | null | undefined
  >(
    [QueryKeys.GET_CLIENT_BY_ID, id],
    async () => {
      const response = await apiFranquia.get(`/client/${id}`, {
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
    { enabled: headers && headers["AuthToken"] ? true : false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
