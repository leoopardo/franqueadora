import { apiFranqueadora } from "@config/api";
import { useMutation } from "react-query";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import { getMeI } from "../auth/useGetMe";
import { QueryKeys } from "../queryKeys";

export const useSendToken = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<any | null | undefined, unknown>({
    mutationFn: async () => {
      const response = await apiFranqueadora.post(
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
