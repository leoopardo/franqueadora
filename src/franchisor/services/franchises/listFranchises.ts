import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";
import {
  Franchise,
  FranchiseParams,
  franchiseResponseSchema
} from "./__interfaces/franchises.interface";

export const useListFranchises = (params: FranchiseParams) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<Franchise> | null | undefined
  >(
    ["listFranchises", params],
    async () => {
      const response = await apiFranquia.get(`/franchise/all`, {
        headers: headers ?? {},
        params,
      });
      const parsedResponse = franchiseResponseSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error((parsedResponse.error as any));
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
