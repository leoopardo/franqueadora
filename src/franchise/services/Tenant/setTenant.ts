import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { QueryKeys } from "../queryKeys";
import { queryClient } from "../../../services/queryClient";

export const useSetTenant = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    { franchise_id?: string | null }
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.post(`/user/tenant`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries();
      return response.data;
    },
    mutationKey: QueryKeys.SET_TENANT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  return {
    data,
    error,
    isLoading,
    mutate,
    isSuccess,
    reset,
  };
};
