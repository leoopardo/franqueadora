import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import { QueryKeys } from "../queryKeys";
import { getCourtesie } from "./__interfaces/getCourtesie.interface";

export const useGetCourtesie = (event_id: string, id: string) => {
  const { headers } = useReportsAuth();
  const { data, error, isLoading, refetch } = useQuery<
  getCourtesie | null | undefined
  >(
    [QueryKeys.LIST_COURTESIES, event_id, id],
    async () => {
      const response = await apiReports.get(`/courtesies/details/${id}`, {
        headers: { ...headers },
        params: { event_id },
      });

      return response.data;
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
