import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { ClientType } from "./__interfaces/clients.interface";

interface ActivateClientArgs {
  body: ClientType;
  id: string;
}

export const useActivateClient = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<ClientType> | null | undefined,
    unknown,
    ActivateClientArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/client/enable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_CLIENTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.ACTIVATE_CLIENT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Cliente habilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível habilitar o cliente.",
      description: (error as any)?.response?.data?.message,
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
