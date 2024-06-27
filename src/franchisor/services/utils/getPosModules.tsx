import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";

export interface PosModulesI {
  id: string;
  name: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export function useGetPosModules() {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading } = useQuery<
    ResponseI<PosModulesI> | null | undefined
  >(["pos-module"], async () => {
    const response = await apiFranquia.get(`pos-module`, {
      headers: { ...headers },
      params: { page: 0, size: 50 },
    });
    return response.data;
  });

  return {
    PosModulesData: data,
    PosModulesError: error,
    isPosModulesLoading: isLoading,
  };
}
