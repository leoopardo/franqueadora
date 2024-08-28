import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import {
  Event,
  EventParams,
  eventResponseSchema,
} from "./__interfaces/event.interface";

export const useListEvents = (params: EventParams) => {
  const { headers } = useReportsAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<Event> | null | undefined
  >(
    [QueryKeys.LIST_EVENT, params],
    async () => {
      const response = await apiReports.get(`/events`, {
        headers: { ...headers },
        params: { ...params },
      });
      const parsedResponse = eventResponseSchema.safeParse(response.data);
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
