export interface courtesyType {
    id: string;
    product_name: string;
    quantity: number;
    value_total: number;
}

export interface getCourtesie {
  courtesie_quantity: number;
  page: number;
  size: number;
  total_courtesie: number;
  total_items: number;
  items: courtesyType[];
}
