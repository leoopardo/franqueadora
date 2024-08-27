import { apiFranquia } from "@config/apiFranquia";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";

export const useDeleteTerminal = () => {
  const { headers } = useFranchisorAuth();
  const navigate = useNavigate();
  const mutation = useMutation<any | null | undefined, unknown, { id: string }>(
    {
      mutationFn: async ({id}) => {
        const response = await apiFranquia.delete(`/terminal/delete/${id}`, {
          headers: { ...headers },
        });
        await queryClient.refetchQueries({
          queryKey: [QueryKeys.LIST_TERMINALS],
        });
        return response.data;
      },
      mutationKey: QueryKeys.DELETE_TERMINAL,
    }
  );

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Terminal deletado com sucesso!" });
    reset();
    navigate("/terminais");
  }
  if (error) {
    notification.error({
      message: "Não foi possível deletar o terminal.",
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
