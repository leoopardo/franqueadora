import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import { QueryKeys } from "../queryKeys";
import {
  OverviewData,
  ProductsSoldData,
  ReprintsData,
  ReturnsData,
  TotalsData,
} from "./__interfaces/overview.interface";
import ResponseI from "../__interfaces/response.interface";

interface CashRegisterData {
  overview: OverviewData;
  totals: TotalsData;
  productsSoldTotals: ResponseI<ProductsSoldData>;
  productsSoldCourtesies: ResponseI<ProductsSoldData>;
  returnsTotals: ResponseI<ReturnsData>;
  reprintsTotals: ResponseI<ReprintsData>;
}

export const useGetCashRegister = (event_id: string, id: string) => {
  const { headers } = useReportsAuth();

  const fetchData = async (): Promise<CashRegisterData> => {
    const routes: Record<
      keyof CashRegisterData,
      { url: string; params: Record<string, any> }
    > = {
      overview: { url: `/caixas/detail/${id}/overview`, params: { event_id } },
      totals: { url: `/caixas/detail/${id}/totals`, params: { event_id } },
      productsSoldTotals: {
        url: "/products-sold/products/totals",
        params: { event_id, caixa_id: id },
      },
      productsSoldCourtesies: {
        url: "/products-sold/products/courtesies/totals",
        params: { event_id, caixa_id: id },
      },
      returnsTotals: {
        url: "/returns/products/totals",
        params: { event_id, caixa_id: id },
      },
      reprintsTotals: {
        url: "/reprints/products/totals",
        params: { event_id, caixa_id: id },
      },
    };

    const requests = Object.entries(routes).map(([key, route]) =>
      apiReports
        .get(route.url, {
          headers: { ...headers },
          params: route.params,
        })
        .then((response) => ({ [key]: response.data }))
        .catch(() => ({ [key]: [] }))
    );

    const resultsArray = await Promise.all(requests);

    // Força o retorno de um objeto com todas as propriedades necessárias
    const resultObject = resultsArray.reduce((acc, result) => {
      return { ...acc, ...result };
    }, {} as Partial<CashRegisterData>);

    // Garante que o objeto resultante tenha todas as propriedades
    return {
      overview: resultObject.overview || [],
      totals: resultObject.totals || [],
      productsSoldTotals: resultObject.productsSoldTotals || [],
      productsSoldCourtesies: resultObject.productsSoldCourtesies || [],
      returnsTotals: resultObject.returnsTotals || [],
      reprintsTotals: resultObject.reprintsTotals || [],
    };
  };

  const { data, error, isLoading, refetch } = useQuery<CashRegisterData>(
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
