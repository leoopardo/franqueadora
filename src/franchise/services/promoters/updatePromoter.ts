import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";
import { updatePromoterI } from "@franchisor/services/promoters/__interfaces/update_promoter.interface";

export const useUpdatePromoter = (id: string) => {
  const { headers } = useFranchiseAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    updatePromoterI
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.put(`/promoter/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_PROMOTERS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.UPDATE_PROMOTER,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Promotor editado com sucesso!" });
    // notification.info({
    //   message: "A sua senha de terminal.",
    //   description: `Armazene sua senha de terminal: ${data?.terminal_password}`,
    //   duration: 5000,
    // });
    reset();
    navigate("/promotores");
  }
  if (error) {
    notification.error({
      message: "Não foi possível editar o promotor.",
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
