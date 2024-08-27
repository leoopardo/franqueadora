import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import { QueryKeys } from "../queryKeys";

type EventData = any; // Ajuste o tipo conforme necessário
type OtherData = any; // Ajuste o tipo conforme necessário

export const useGetEvent = (id: string) => {
  const { headers } = useReportsAuth();

  // Função para buscar dados das várias rotas
  const fetchData = async () => {
    // Defina as rotas e parâmetros para suas requisições
    const routes = [
      { url: '/pub/totalizers', params: { event_id: id } },
      { url: '/pub/payments-methods', params: { event_id: id } },
      { url: '/pub/payments-by-type', params: { event_id: id } },
      { url: '/pub/payments-by-hour', params: { event_id: id } }
    ];

    // Cria uma lista de promessas para todas as rotas
    const requests = routes.map(route =>
      apiReports.get(route.url, {
        headers: { ...headers },
        params: route.params,
      }).then(response => response.data)
    );

    // Aguarda todas as promessas serem resolvidas
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

  // Retorna os dados como um array
  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
