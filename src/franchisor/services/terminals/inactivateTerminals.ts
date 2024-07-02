import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { Terminal } from "./__interfaces/terminals.interface";

interface InactivateTerminalArgs {
  body: Terminal;
  id: string;
}

export const useInactivateTerminal = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<Terminal> | null | undefined,
    unknown,
    InactivateTerminalArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/terminal/disable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_TERMINALS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.INACTIVATE_TERMINAL,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Terminal desabilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível desabilitar o terminal.",
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
