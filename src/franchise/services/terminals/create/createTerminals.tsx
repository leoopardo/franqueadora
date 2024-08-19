import { apiFranquia } from "@config/apiFranquia";
import { getMeI } from "@franchise/services/auth/useGetMe";
import { QueryKeys } from "@franchise/services/queryKeys";
import { CreateTerminals } from "@franchisor/services/terminals/__interfaces/create_terminals.interface";
import { notification } from "antd";
import cookies from "js-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../../services/queryClient";

export const useCreateTerminals = () => {
  const user = queryClient.getQueryData(QueryKeys.GET_ME) as getMeI;
  const { headers } = useFranchiseAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    CreateTerminals
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.post(
        `/terminal/batch`,
        {
          ...body,
          franchise_id: user?.Franchise ? user?.Franchise[0]?.id : undefined,
          promoter_id: body.promoter_id
            ? body.promoter_id
            : user?.Promoter
              ? user?.Promoter?.id
              : undefined,
          client_id: body.client_id
            ? body.client_id
            : user?.Client
              ? user?.Client?.id
              : undefined,
        },
        {
          headers: { ...headers },
        }
      );
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_TERMINALS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.CREATE_TERMINAL,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Terminal criado com sucesso!" });
    reset();
    cookies.remove("create_terminal");
    navigate("/terminais");
  }
  if (error) {
    notification.error({
      message: "Não foi possível criar o terminal.",
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
