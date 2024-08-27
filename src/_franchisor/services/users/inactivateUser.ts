import { notification } from "antd";
import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { UserType } from "./__interfaces/users.interface";
import { queryClient } from "../../../services/queryClient";

interface InactivateUserArgs {
  body: UserType;
  id: string;
}

export const useInactivateUser = () => {
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<UserType> | null | undefined,
    unknown,
    InactivateUserArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiFranquia.put(`/user/disable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_USERS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.INACTIVATE_USER,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Usuário desabilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível desabilitar o usuário.",
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
