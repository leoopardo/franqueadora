import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../interfaces/response.interface";

export interface AgreementsI {
  id: string;
  type: string;
  key: string;
  name: string;
  description: string;
  value: string;
  value_type: string;
  active: true;
  created_at: string;
  updated_at: string;
}

export function useGetAgreements() {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading } = useQuery<
    ResponseI<AgreementsI> | null | undefined
  >(["agreement"], async () => {
    const response = await apiFranquia.get(`agreement`, {
      headers: { ...headers },
      params: { page: 0, size: 50 },
    });
    return response.data;
  });

  return {
    AgreementsData: data,
    AgreementsError: error,
    isAgreementsLoading: isLoading,
  };
}
