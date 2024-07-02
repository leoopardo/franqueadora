export interface createFranchiseI {
  address?: {
    address: string;
    cep: string;
    city: string;
    complement: string;
    district: string;
    number: string;
    state: string;
  };
  agreement?: { template_id: string; value: string }[];
  area_codes?: string[];
  cnpj?: string;
  commercial_name?: string;
  company_name?: string;
  contacts?: any[];
  counties?: string[];
  franchise_name?: string;
  state_registration?: string;
  master?: {
    cpf: string;
    email: string;
    name: string;
    password: string;
    phone: string;
    terminal_password: string;
    username: string;
  };
  module?: string[];
}
