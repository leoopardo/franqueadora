import { apiPortalEvent } from "@config/apiPortalEvent";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { QueryKeys } from "../queryKeys";
import { MenuById } from "./__interfaces/menu.byId.interface";

export const useGetMenyuById = (id?: string) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    MenuById | null | undefined
  >(
    [QueryKeys.GET_MENU_BY_ID, id],
    async () => {
      const response = await apiPortalEvent.get(`/menu/${id}`, {
        headers: {
          ...headers,
        },
      });

      return response.data;
    },
    { enabled: headers && headers["AuthToken"] && id ? true : false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
