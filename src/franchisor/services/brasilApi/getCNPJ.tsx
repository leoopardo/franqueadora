import axios from "axios";
import { useQuery } from "react-query";

export interface CnpjResponse {
  cnpj: string;
  descricao_matriz_filial: string;
  razao_social: string;
  nome_fantasia: string;
  situacao_cadastral: number;
  descricao_situacao_cadastral: string;
  data_inicio_atividade: string;
  cnae_fiscal: number;
  cnae_fiscal_descricao: string;
  descricao_tipo_de_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: number;
  uf: string;
  municipio: string;
}

export function useGetCNPJ(cnpj: string) {
  const { data, error, isLoading, remove } = useQuery<CnpjResponse | null | undefined>(
   ["getCnpj", cnpj],
    async () => {
      const response = await axios.get(
        `https://brasilapi.com.br/api/cnpj/v1/${cnpj.replace(/\D/g, '')}`
      );
      return response.data;
    }
  );

  return {
    data,
    error,
    isLoading,
    remove,
  };
}
