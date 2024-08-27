import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { Franchise } from "./__interfaces/franchises.interface";

interface ActivateFranchiseArgs {
  body: Franchise;
  id: string;
}

export const useActivateFranchise = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<Franchise> | null | undefined,
    unknown,
    ActivateFranchiseArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/franchise/enable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_FRANCHISES],
      });
      return response.data;
    },
    mutationKey: QueryKeys.ACTIVATE_FRANCHISE,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Franquia habilitada com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível habilitar a franquia.",
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
