import { CreateTerminals } from "../../../_franchisor/services/terminals/__interfaces/create_terminals.interface";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";

export const useUpdateTerminal = (id: string) => {
  const { headers } = useFranchiseAuth();
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
    mutationKey: QueryKeys.UPDATE_TERMINAL,
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
