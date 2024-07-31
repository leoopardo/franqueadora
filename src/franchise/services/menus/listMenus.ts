import { apiPortalEvent } from "@config/apiPortalEvent";
import ResponseI from "@franchise/services/__interfaces/response.interface";
import { QueryKeys } from "@franchise/services/queryKeys";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import {
  MenuParams,
  MenuResponseSchema,
  MenuType,
} from "./__interfaces/menu.interface";

export const useListMenus = (params: MenuParams) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<MenuType> | null | undefined
  >(
    [QueryKeys.LIST_MENUS, params, headers],
    async () => {
      const response = await apiPortalEvent.get(`/menu/all`, {
        headers: { ...headers },
        params: { orderBy: "created_at", orderDirection: "desc", ...params },
      });
      const parsedResponse = MenuResponseSchema.safeParse(response.data);
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
