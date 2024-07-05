import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { QueryKeys } from "../queryKeys";
import {
  Franchise,
  FranchiseSchema
} from "./__interfaces/franchises.interface";

export const useGetFranchiseById = (id: string) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch, isSuccess } = useQuery<
    Franchise | null | undefined
  >(
    [QueryKeys.LIST_FRANCHISES, id],
    async () => {
      const response = await apiFranquia.get(`/franchise/${id}`, {
        headers: { ...headers }
      });
      const parsedResponse = FranchiseSchema.safeParse(response.data);
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
    refetch,isSuccess
  };
};
