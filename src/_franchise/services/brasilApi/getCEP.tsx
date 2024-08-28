import axios from "axios";
import { useQuery } from "react-query";

export interface CepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

export function useGetCEP(cep: string) {
  const { data, error, isLoading, remove } = useQuery<
    CepResponse | null | undefined
  >(["getCep", cep], async () => {
    const response = await axios.get(
      `https://brasilapi.com.br/api/cep/v2/${cep}`
    );
    return response.data;
  }, {enabled: cep ? true : false});

  return {
    data,
    error,
    isLoading,
    remove,
  };
}
