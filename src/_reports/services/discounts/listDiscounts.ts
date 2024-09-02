import { apiReports } from "@config/apiReports";
import { useQuery } from "react-query";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import { QueryKeys } from "../queryKeys";
import {
  discountParams,
  DiscountResponse
} from "./__interfaces/discounts.interface";

export const useListDiscounts = (params: discountParams) => {
  const { headers } = useReportsAuth();
  const { data, error, isLoading, refetch } = useQuery<
  DiscountResponse | null | undefined
  >(
    [QueryKeys.LIST_DISCOUNTS, params],
    async () => {
      const response = await apiReports.get(`/discounts`, {
        headers: { ...headers },
        params: { ...params },
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
