import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { createPromoterI } from "./__interfaces/create_promoter.interface";
import { Promoter } from "./__interfaces/promoters.interface";

export const useCreatePromoter = () => {
  const { headers } = useFranchisorAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    ResponseI<Promoter> | null | undefined,
    unknown,
    createPromoterI
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.post(`/promoter`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_PROMOTERS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.CREATE_PROMOTER,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Promotor criado com sucesso!" });
    reset();
    navigate(-1);
  }
  if (error) {
    notification.error({
      message: "Não foi possível criar o promotor.",
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
