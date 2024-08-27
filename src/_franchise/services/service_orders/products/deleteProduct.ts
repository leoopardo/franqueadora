import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "../../queryKeys";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../../services/queryClient";

export const useDeleteProduct = () => {
  const { headers } = useFranchiseAuth();
  const navigate = useNavigate();
  const mutation = useMutation<any | null | undefined, unknown, { id: string }>(
    {
      mutationFn: async ({id}) => {
        const response = await apiPortalEvent.delete(`/product/delete/${id}`, {
          headers: { ...headers },
        });
        await queryClient.refetchQueries({
          queryKey: [QueryKeys.LIST_PRODUCTS],
        });
        return response.data;
      },
      mutationKey: QueryKeys.DELETE_PRODUCT,
    }
  );

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Produto deletado com sucesso!" });
    reset();
    navigate("/fichas/produtos");
  }
  if (error) {
    notification.error({
      message: "Não foi possível deletar o produto.",
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
