import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { Promoter } from "./__interfaces/promoters.interface";

interface ActivatePromoterArgs {
  body: Promoter;
  id: string;
}

export const useActivatePromoter = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<Promoter> | null | undefined,
    unknown,
    ActivatePromoterArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/promoter/enable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_PROMOTERS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.ACTIVATE_PROMOTER,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Promotor habilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível habilitar promotor.",
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
