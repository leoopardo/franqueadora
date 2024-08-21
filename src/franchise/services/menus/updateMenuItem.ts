import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "@franchise/services/queryKeys";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";

export const useUpdateMenuItem = (id: string) => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<any | null | undefined, unknown, any>({
    mutationFn: async (body) => {
      const response = await apiPortalEvent.put(`/menu/itens/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.GET_MENU_BY_ID],
      });
      return response.data;
    },
    mutationKey: QueryKeys.CREATE_MENU_ITEM,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível cadastrar o cardápio.",
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
