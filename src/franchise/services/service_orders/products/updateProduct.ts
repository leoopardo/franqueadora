import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "@franchise/services/queryKeys";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../../services/queryClient";
import { CreateProductType } from "./_interfaces/create_product.interface";

export const useUpdateProduct = (id: string) => {
  const { headers } = useFranchiseAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    CreateProductType
  >({
    mutationFn: async (body) => {
      const response = await apiPortalEvent.put(`/product/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_PRODUCTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.UPDATE_PRODUCT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Produto editado com sucesso!" });
    reset();
    navigate("/fichas/produtos");
  }
  if (error) {
    notification.error({
      message: "Não foi possível editar o produto.",
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
