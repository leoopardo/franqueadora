import { apiPortalEvent } from "@config/apiPortalEvent";
import ResponseI from "../../__interfaces/response.interface";
import { QueryKeys } from "../../queryKeys";
import { useQuery } from "react-query";
import {
  ProductParams,
  ProductResponseSchema,
  ProductType,
} from "./_interfaces/products.interface";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";

export const useListProducts = (params: ProductParams) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<ProductType> | null | undefined
  >(
    [QueryKeys.LIST_PRODUCTS, params, headers],
    async () => {
      const response = await apiPortalEvent.get(`/product/all`, {
        headers: { ...headers },
        params: { orderBy: "name", orderDirection: "asc", ...params },
      });
      const parsedResponse = ProductResponseSchema.safeParse(response.data);
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
