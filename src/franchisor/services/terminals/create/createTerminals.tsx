import { notification } from "antd";
import cookies from "js-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import { apiFranquia } from "@config/apiFranquia";
import { queryClient } from "../../../../services/queryClient";
import { QueryKeys } from "@franchisor/services/queryKeys";
import { CreateTerminals } from "../__interfaces/create_terminals.interface";

export const useCreateTerminals = () => {
  const { headers } = useFranchisorAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    CreateTerminals
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.post(`/terminal/batch`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_TERMINALS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.CREATE_TERMINALS,
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
