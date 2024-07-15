import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { Terminal } from "./__interfaces/terminals.interface";

interface ActivateTerminalArgs {
  body: Terminal;
  id: string;
}

export const useActivateTerminal = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<
    ResponseI<Terminal> | null | undefined,
    unknown,
    ActivateTerminalArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/terminal/enable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_TERMINALS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.ACTIVATE_TERMINAL,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Terminal habilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível habilitar  o terminal.",
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
