import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import { QueryKeys } from "../queryKeys";

export const useGetEvent = (id: string) => {
  const { headers } = useReportsAuth();

  const fetchData = async () => {
    const routes = [
      { url: '/pub/totalizers', params: { event_id: id } },
      { url: '/pub/payments-methods', params: { event_id: id } },
      { url: '/pub/payments-by-type', params: { event_id: id } },
      { url: '/pub/payments-by-hour', params: { event_id: id } }
    ];

    const requests = routes.map(route =>
      apiReports.get(route.url, {
        headers: { ...headers },
        params: route.params,
      }).then(response => response.data)
    );

    return Promise.all(requests);
  };

  const { data, error, isLoading, refetch } = useQuery<any | null | undefined>(
    [QueryKeys.GET_EVENT_TOTALIZER, id],
    fetchData,
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
