
import { apiPortalEvent } from "@config/apiPortalEvent";
import ResponseI from "@franchise/services/__interfaces/response.interface";
import { QueryKeys } from "@franchise/services/queryKeys";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { EventParams, EventResponseSchema, EventType } from "./__interfaces/events.interface";

export const useListEvents = (params: EventParams) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<EventType> | null | undefined
  >(
    [QueryKeys.LIST_EVENTS, params, headers],
    async () => {
      const response = await apiPortalEvent.get(`/days/events/all`, {
        headers: { ...headers },
        params: { orderBy: "created_at", orderDirection: "desc", ...params },
      });
      const parsedResponse = EventResponseSchema.safeParse(response.data);
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
