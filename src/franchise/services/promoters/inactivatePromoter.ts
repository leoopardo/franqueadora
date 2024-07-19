import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { Promoter } from "./__interfaces/promoters.interface";

interface InactivatePromoterArgs {
  body: Promoter;
  id: string;
}

export const useInactivatePromoter = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<
    ResponseI<Promoter> | null | undefined,
    unknown,
    InactivatePromoterArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/promoter/disable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_PROMOTERS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.INACTIVATE_PROMOTER,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Promotor desabilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível desabilitar promotor.",
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
