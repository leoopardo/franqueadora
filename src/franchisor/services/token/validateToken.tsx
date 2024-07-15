import { apiFranqueadora } from "@config/api";
import { useMutation } from "react-query";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import { getMeI } from "../auth/useGetMe";
import { QueryKeys } from "../queryKeys";
import { notification } from "antd";

export const useValidateToken = ({ onSuccess }: { onSuccess: () => void }) => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<any | null | undefined, unknown, string>({
    mutationFn: async (token) => {
      const response = await apiFranqueadora.post(
        `/p/auth/validate-token`,
        {
          token,
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

  if (isSuccess) {
    onSuccess();
    reset();
  }

  if (error) {
    notification.error({
      message: "Token incorreto",
      description:
        "Por favor, verifique novamente o token enviado para o seu email.",
    });
    reset();
  }

  return {
    data,
    error,
    isLoading,
    mutate,
    isSuccess,
    reset,
  };
};
