import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";
import { updateClientI } from "@franchisor/services/clients/__interfaces/update_client.interface";

export const useUpdateClient = (id: string) => {
  const { headers } = useFranchiseAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    updateClientI
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.put(`/client/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_CLIENTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.UPDATE_CLIENT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Cliente editado com sucesso!" });
    // notification.info({
    //   message: "A sua senha de terminal.",
    //   description: `Armazene sua senha de terminal: ${data?.terminal_password}`,
    //   duration: 5000,
    // });
    reset();
    navigate("/clientes");
  }
  if (error) {
    notification.error({
      message: "Não foi possível editar o cliente.",
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
