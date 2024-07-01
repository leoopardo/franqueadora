import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { QueryKeys } from "../queryKeys";

export const useGetPendingNumber = () => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    number | null | undefined
  >(
    [QueryKeys.PENDING_NUMBER],
    async () => {
      const response = await apiFranquia.get(`/terminal/pending/total`, {
        headers: headers ?? {},
      });

      return response.data;
    },
    { enabled: !!headers?.["AuthToken"], refetchInterval: 60000 }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
