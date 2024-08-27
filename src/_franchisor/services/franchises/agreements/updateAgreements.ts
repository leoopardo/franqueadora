import { apiFranquia } from "@config/apiFranquia";
import ResponseI from "../../__interfaces/response.interface";
import { QueryKeys } from "../../queryKeys";
import { useMutation } from "react-query";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import { queryClient } from "../../../../services/queryClient";
import { franchiseAgreementsRoute } from "../__interfaces/create_franchise.interface";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export const useUpdateAgreements = (id: string) => {
  const navigate = useNavigate();
  const { headers } = useFranchisorAuth();
  const mutation = useMutation<
    ResponseI<franchiseAgreementsRoute> | null | undefined,
    unknown,
    any
  >({
    mutationFn: async (body) => {
      const response = await apiFranquia.put(
        `/franchise/agreement/${id}`,
        body,
        {
          headers: { ...headers },
        }
      );
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_FRANCHISES],
      });
      return response.data;
    },
    mutationKey: QueryKeys.UPDATE_FRANCHISE_AGREEMENTS,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Acordos atualizados com sucesso!" });
    reset();
    navigate("/franquias");
  }
  if (error) {
    notification.error({
      message: "Não foi possível atualizar os acordos.",
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
