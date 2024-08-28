export interface CreateProductType {
  brand: string;
  code: number;
  consumption_unit_id: string;
  description: string;
  image?: any;
  image_extension?: string;
  is_additional: boolean;
  name: string;
  type: string;
}
