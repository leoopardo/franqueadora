import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "../queryKeys";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { CreateMenuItemI } from "./__interfaces/create.menu.interface";

export const useCreateMenuItem = (id: string) => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<any | null | undefined, unknown, CreateMenuItemI[]>({
    mutationFn: async (body) => {
      const response = await apiPortalEvent.post(`/menu/itens/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.GET_MENU_BY_ID],
      });
      return response.data;
    },
    mutationKey: QueryKeys.CREATE_MENU,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    reset();
    notification.success({
      message: "Produto adicionado ao cardápio com sucesso!",
    });
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
