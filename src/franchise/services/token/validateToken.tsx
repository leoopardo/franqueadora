import { apiFranqueadora } from "@config/api";
import { apiFranquia } from "@config/apiFranquia";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { getMeI } from "../auth/useGetMe";
import { QueryKeys } from "../queryKeys";

export const useValidateToken = ({ onSuccess }: { onSuccess: () => void }) => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<any | null | undefined, unknown, string>({
    mutationFn: async (token) => {
      const response = localStorage.getItem("master")
        ? await apiFranqueadora.post(
            `/p/auth/validate-token`,
            {
              token,
              username: (queryClient.getQueryData(QueryKeys.GET_ME) as getMeI)
                .username,
            },
            {
              headers: { ...headers },
            }
          )
        : await apiFranquia.post(
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
