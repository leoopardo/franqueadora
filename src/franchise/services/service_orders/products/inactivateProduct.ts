import { apiPortalEvent } from "@config/apiPortalEvent";
import { notification } from "antd";
import { useMutation } from "react-query";
import { ProductType } from "./_interfaces/products.interface";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import ResponseI from "@franchisor/services/__interfaces/response.interface";
import { queryClient } from "../../../../services/queryClient";
import { QueryKeys } from "@franchise/services/queryKeys";

interface InactivateProductArgs {
  body: ProductType;
  id: string;
}

export const useInactivateProduct = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<
    ResponseI<ProductType> | null | undefined,
    unknown,
    InactivateProductArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiPortalEvent.put(`/product/disable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_PRODUCTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.INACTIVATE_PRODUCT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Produto desabilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível desabilitar o produto.",
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
