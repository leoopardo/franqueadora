import { notification } from "antd";
import { useMutation } from "react-query";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import ResponseI from "../../../../_franchisor/services/__interfaces/response.interface";
import { Terminal } from "../__interfaces/terminals.interface";
import { apiFranquia } from "@config/apiFranquia";
import { queryClient } from "../../../../services/queryClient";
import { QueryKeys } from "../../../../_franchisor/services/queryKeys";

export const useReproveTerminals = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<Terminal> | null | undefined,
    unknown,
    string[]
  >({
    mutationFn: async (terminals) => {
      const response = await apiFranquia.put(`/terminal/pending/reprove`, terminals, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_PENDING_TERMINALS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.REPROVE_TERMINAL,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Terminalis aprovados com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível aprovar os terminais.",
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
