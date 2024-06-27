import ParamsI from "../../__interfaces/queryParams.interface";

export interface PromotersI {
  active?: boolean;
  city?: string;
  client_manage?: boolean;
  franchise_cnpj?: string;
  franchise_id?: string;
  franchise_name?: string;
  id?: string;
  is_physical_person?: boolean;
  missing_agreements?: boolean;
  modules?: string[];
  promoter_document?: string;
  promoter_name?: string;
  ref_id?: string;
  state?: string;
  use_products_database?: boolean;
  username?: string
}

export interface PromotersParams extends ParamsI {
  s?: string;
  f?: string[];
}
