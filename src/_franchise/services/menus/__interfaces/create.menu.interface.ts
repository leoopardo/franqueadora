export interface CreateMenuI {
  client_document: string;
  client_id: string;
  client_name: string;
  event_ids: [];
  groups: { name: string; order: number; logo_image: any }[];
  name: string;
  promoter_document: string;
  promoter_id: string;
  promoter_name: string;
}

export interface CreateMenuItemI {
  available_quantity?: number | null;
  description: string;
  extra_products: {
    product_id: string;
    consumption_quantity?: number | null;
  }[];
  group_id: string;
  ingredients: any[];
  link_stock: boolean;
  multiplier: number;
  order: number;
  print_production_form: boolean;
  products: {
    product_id: string;
    consumption_quantity: number | null;
  }[];
  sale_limit: boolean;
  sale_price: number;
  type: string;
}
