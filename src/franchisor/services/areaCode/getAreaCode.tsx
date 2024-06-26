import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";

export interface areaCodeI {
  id: string;
  code: string;
  state: string;
  active: boolean;
}

export function useGetAreaCode() {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading } = useQuery<areaCodeI[] | null | undefined>(
    ["getAreaCode"],
    async () => {
      const response = await apiFranquia.get(`area-code`, {
        headers: headers ?? {},
      });
      return response.data;
    }
  );

  return {
    AreaCodeData: data,
    AreaCodeError: error,
    isAreaCodeLoading: isLoading,
  };
}
