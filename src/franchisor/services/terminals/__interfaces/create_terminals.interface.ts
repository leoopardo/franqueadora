export interface CreateTerminals {
  acquirers: string[];
  client_id?: string;
  franchise_id: string;
  license_expiration_date?: string | null;
  model_id: string;
  modules: string[];
  promoter_id?: string;
  promoter_license_id?: string | null;
  serial_numbers: string[];
  situation: string;
  time_zone_id: string;
}
