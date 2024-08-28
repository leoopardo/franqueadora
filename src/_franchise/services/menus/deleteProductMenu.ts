import { apiPortalEvent } from "@config/apiPortalEvent";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";

export const useDeleteProductMenu = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<any | null | undefined, unknown, { id: string }>(
    {
      mutationFn: async ({ id }) => {
        const response = await apiPortalEvent.delete(`/menu/item/${id}`, {
          headers: { ...headers },
        });
        await queryClient.refetchQueries({
          queryKey: [QueryKeys.GET_MENU_BY_ID],
        });
        return response.data;
      },
      mutationKey: QueryKeys.DELETE_MENU_ITEM,
    }
  );

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Item deletado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível deletar o item.",
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
