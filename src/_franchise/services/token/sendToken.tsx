import { apiFranquia } from "@config/apiFranquia";
import { useMutation } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { getMeI } from "../auth/useGetMe";
import { QueryKeys } from "../queryKeys";
import { apiFranqueadora } from "@config/api";

export const useSendToken = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<any | null | undefined, unknown>({
    mutationFn: async () => {
      const response = localStorage.getItem("master")
        ? await apiFranqueadora.post(
            `/auth/user/request-password-token`,
            {
              method: localStorage.getItem("tokenChannel"),
              username: (queryClient.getQueryData(QueryKeys.GET_ME) as getMeI)
                .username,
            },
            {
              headers: { ...headers },
            }
          )
        : await apiFranquia.post(
            `/auth/user/request-password-token`,
            {
              method: localStorage.getItem("tokenChannel"),
              username: (queryClient.getQueryData(QueryKeys.GET_ME) as getMeI)
                .username,
            },
            {
              headers: { ...headers },
            }
          );
      return response.data;
    },
    mutationKey: QueryKeys.SEND_TOKEN,
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
