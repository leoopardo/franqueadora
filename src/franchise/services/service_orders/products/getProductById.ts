import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "@franchise/services/queryKeys";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import {
  ProductSchema,
  ProductType
} from "./_interfaces/products.interface";

export const useGetProductById = (id: string) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ProductType | null | undefined
  >(
    [QueryKeys.LIST_PRODUCTS, id, headers],
    async () => {
      const response = await apiPortalEvent.get(`/product/${id}`, {
        headers: { ...headers },
        params: { orderBy: "created_at", orderDirection: "desc" },
      });
      const parsedResponse = ProductSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error(parsedResponse.error as any);
      }

      return parsedResponse.data;
    },
    {
      enabled: headers && headers["AuthToken"] ? true : false,
      refetchOnWindowFocus: true,
    }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
