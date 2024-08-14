import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";
import { CreateTerminals } from "./__interfaces/create_terminals.interface";

export const useUpdateTerminal = (id: string) => {
  const { headers } = useFranchisorAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    CreateTerminals
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.put(`/terminal/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_TERMINALS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.UPDTAE_TERMINAL,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Terminal editado com sucesso!" });
    reset();
    navigate("/terminais");
  }
  if (error) {
    notification.error({
      message: "Não foi possível editar o terminal.",
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
