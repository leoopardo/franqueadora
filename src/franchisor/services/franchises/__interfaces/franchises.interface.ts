import ParamsI from "../../__interfaces/queryParams.interface";

export interface FranchisesI {
    id?: string;
    franchise_name?: string;
    cnpj?: string;
    active?: boolean;
    is_deleted?: boolean;
    created_at?: string;
    updated_at?: string;
    tenant_id?: string;
    ref_id?: string;
    master_id?: string;
    username?: string;
    state_registration?: string;
    commercial_name?: string;
    company_name?: string;
    master?: {
      id?: string;
      user_id?: number;
      name?: string;
      role?: string;
      type?: null;
      phone?: string;
      email?: string;
      username?: string;
      cognito_id?: string;
      active?: boolean;
      created_at?: string;
      updated_at?: string;
      document?: string;
      is_deleted?: boolean;
      is_admin?: boolean;
      id_role?: string;
      id_auth?: string;
      modified_role?: boolean;
      is_blocked?: boolean;
      client_id?: string;
      promoter_id?: string;
      is_report?: boolean;
      report_event_id?: [];
    };
    FranchisePOSModule?: {
      POSModule?: {
        id?: string;
        name?: string;
        description?: string;
      };
    }[];
    FranchiseAddress?: {
      id?: string;
      franchise_id?: string;
      cep?: string;
      address?: string;
      number?: string;
      state?: string;
      city?: string;
      district?: string;
      complement?: string;
      active?: true;
      created_at?: string;
      updated_at?: string;
    };
  }
  
  export interface FranchiseParams extends ParamsI {
    s?: string;
    f?: string[];
  }