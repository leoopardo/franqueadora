import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "../queryKeys";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { SelectsSchema, SelectType } from "./__interfaces/selects.interface";

export const getSelectsData = () => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    SelectType | null | undefined
  >(
    [QueryKeys.GET_EVENT_SELECT, headers],
    async () => {
      const response = await apiPortalEvent.get(`event/selects`, {
        headers: { ...headers },
        params: { orderBy: "created_at", orderDirection: "desc" },
      });
      const parsedResponse = SelectsSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error(parsedResponse.error as any);
      }

      return parsedResponse.data;
    },
    { enabled: headers && headers["AuthToken"] ? true : false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
