import { apiPortalEvent } from "@config/apiPortalEvent";
import { QueryKeys } from "../queryKeys";
import { useQuery } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";

export const useGetEventById = (id?: string) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    any | null | undefined
  >(
    [QueryKeys.GET_EVENT_BY_ID, id, headers],
    async () => {
      const response = await apiPortalEvent.get(`/event/${id}`, {
        headers: { ...headers },
      });
      // const parsedResponse = EventResponseSchema.safeParse(response.data);
      // if (!parsedResponse.success) {
      //   throw new Error(parsedResponse.error as any);
      // }

      return response.data;
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
