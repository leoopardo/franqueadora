import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";
import { createFranchiseI } from "./__interfaces/create_franchise.interface";
import { Franchise } from "./__interfaces/franchises.interface";

export const useCreateFranchise = () => {
  const { headers } = useFranchisorAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    Franchise | null | undefined,
    unknown,
    createFranchiseI
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.post(`/franchise`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_FRANCHISES],
      });
      return response.data;
    },
    mutationKey: QueryKeys.CREATE_FRANCHISE,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({
      message: "Franquia criada com sucesso!",
      props: { "data-testid": "success" },
    });
    notification.info({
      message: "A sua senha de terminal.",
      description: `Armazene sua senha de terminal: ${data?.terminal_password}`,
      duration: 5000,
    });
    reset();
    navigate(-1);
  }
  if (error) {
    notification.error({
      message: "Não foi possível criar a franquia.",
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
