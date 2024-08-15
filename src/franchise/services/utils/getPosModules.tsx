import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { queryClient } from "../../../services/queryClient";
import { getMeI } from "../auth/useGetMe";

export interface PosModulesI {
  id: string;
  name: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export function useGetPosModules() {
  const { headers } = useFranchiseAuth();
  const user = queryClient.getQueryData("getMeFranchise") as getMeI;
  const { data, error, isLoading } = useQuery<
    ResponseI<PosModulesI> | null | undefined
  >(
    ["franchisePosModules"],
    async () => {
      const response = await apiFranquia.get(`pos-module/user`, {
        headers: { ...headers },
        params: {
          page: 0,
          size: 50,
          franchise_id: user?.Franchise ? user?.Franchise[0]?.id : undefined,
        },
      });
      return response.data;
    },
    {
      enabled: false,
      refetchOnWindowFocus: true,
    }
  );

  return {
    PosModulesData: data,
    PosModulesError: error,
    isPosModulesLoading: isLoading,
  };
}
