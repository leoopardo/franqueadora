import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { ClientType } from "./__interfaces/clients.interface";

interface InactivateClientArgs {
  body: ClientType;
  id: string;
}

export const useInactivateClient = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<
    ResponseI<ClientType> | null | undefined,
    unknown,
    InactivateClientArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/client/disable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_CLIENTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.INACTIVATE_CLIENT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Cliente desabilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível desabilitar o cliente.",
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
