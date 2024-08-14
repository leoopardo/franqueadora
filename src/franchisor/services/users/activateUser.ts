import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { UserType } from "./__interfaces/users.interface";
import { queryClient } from "../../../services/queryClient";

interface ActivateUserArgs {
  body: UserType;
  id: string;
}

export const useActivateUser = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<UserType> | null | undefined,
    unknown,
    ActivateUserArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/user/enable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_USERS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.ACTIVATE_USER,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Usere habilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível habilitar o usuário.",
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
