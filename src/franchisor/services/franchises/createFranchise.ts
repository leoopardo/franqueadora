import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { createFranchiseI } from "./__interfaces/create_franchise.interface";
import { Franchise } from "./__interfaces/franchises.interface";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export const useCreateFranchise = () => {
  const { headers } = useFranchisorAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    ResponseI<Franchise> | null | undefined,
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
    mutationKey: QueryKeys.INACTIVATE_FRANCHISE,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Franquia criada com sucesso!" });
    reset();
    navigate(-1);
  }
  if (error) {
    notification.error({
      message: "Não foi criar a franquia.",
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
