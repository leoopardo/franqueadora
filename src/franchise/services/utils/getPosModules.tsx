import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";

export interface PosModulesI {
  id: string;
  name: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface getPOSI {
  franchise_id?: string;
  promoter_id?: string;
  client_id?: string;
}

export function useGetPosModules({
  client_id,
  franchise_id,
  promoter_id,
}: getPOSI) {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading } = useQuery<PosModulesI[] | null | undefined>(
    ["pos-module", client_id, franchise_id, promoter_id],
    async () => {
      const response = await apiFranquia.get(`pos-module/user`, {
        headers: { ...headers },
        params: { page: 0, size: 50, franchise_id, promoter_id, client_id },
      });
      return response.data;
    }
  );

  return {
    PosModulesData: data,
    PosModulesError: error,
    isPosModulesLoading: isLoading,
  };
}
