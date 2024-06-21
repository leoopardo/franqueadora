import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../interfaces/response.interface";
import {
  FranchiseParams,
  FranchisesI,
} from "./interfaces/franchises.interface";

export const useListFranchises = (params: FranchiseParams) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<FranchisesI> | null | undefined
  >(
    ["listFranchises", params],
    async () => {
      const response = await apiFranquia.get(`/franchise/all`, {
        headers: headers ?? {},
        params,
      });
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
