import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";

export interface CityCodeI {
  id: string;
  area_code_id: string;
  name: string;
  active: boolean;
}

export function useGetCityCode(area_code_id: string[]) {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading } = useQuery<CityCodeI[] | null | undefined>(
    ["getCityCode", area_code_id],
    async () => {
      const response = await apiFranquia.get(`county`, {
        headers: { ...headers },
        params: { area_code_id },
      });
      return response.data;
    }
  );

  return {
    CityCodeData: data,
    CityCodeError: error,
    isCityCodeLoading: isLoading,
  };
}
