import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import { QueryKeys } from "../queryKeys";
import {
  PaymentMethods,
  ProductsSoldData,
  TotalsData,
} from "./__interfaces/overview.interface";
import ResponseI from "../__interfaces/response.interface";

interface WaiterData {
  paymentMethods: PaymentMethods;
  totals: TotalsData;
  productSold: ResponseI<ProductsSoldData>;
  productSoldCourtesies: ResponseI<ProductsSoldData>;
  returnsTotals: ResponseI<ProductsSoldData>;
  reprintsTotals: ResponseI<ProductsSoldData>;
}

export const useGetWaiter = (event_id: string, id: string) => {
  const { headers } = useReportsAuth();

  const fetchData = async (): Promise<WaiterData> => {
    const routes: Record<
      keyof WaiterData,
      { url: string; params: Record<string, any> }
    > = {
      paymentMethods: {
        url: `/waiters/detail/${id}/payment-methods`,
        params: { event_id },
      },
      totals: { url: `/waiters/detail/${id}/totalizers`, params: { event_id } },
      productSold: {
        url: `/products-sold/products/totals`,
        params: { event_id, waiter_id: id },
      },
      productSoldCourtesies: {
        url: `/products-sold/products/courtesies/totals`,
        params: { event_id, waiter_id: id },
      },
      returnsTotals: {
        url: `/returns/products/totals`,
        params: { event_id, waiter_id: id },
      },
      reprintsTotals: {
        url: `/reprints/products/totals`,
        params: { event_id, waiter_id: id },
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
    }, {} as Partial<WaiterData>);

    // Garante que o objeto resultante tenha todas as propriedades
    return {
      paymentMethods: resultObject.paymentMethods || [],
      totals: resultObject.totals || [],
      productSold: resultObject.productSold || [],
      productSoldCourtesies: resultObject.productSoldCourtesies || [],
      returnsTotals: resultObject.returnsTotals || [],
      reprintsTotals: resultObject.reprintsTotals || [],
    };
  };

  const { data, error, isLoading, refetch } = useQuery<WaiterData>(
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
