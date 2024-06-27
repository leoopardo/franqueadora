import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { FranchisesI } from "./__interfaces/franchises.interface";

interface InactivateFranchiseArgs {
  body: FranchisesI;
  id: string;
}

export const useInactivateFranchise = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<FranchisesI> | null | undefined,
    unknown,
    InactivateFranchiseArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/franchise/disable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_FRANCHISES],
      });
      return response.data;
    },
    mutationKey: QueryKeys.INACTIVATE_FRANCHISE,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Franquia desabilitada com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível desabilitar franquia.",
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
