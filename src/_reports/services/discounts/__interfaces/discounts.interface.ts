import ParamsI from "../../__interfaces/queryParams.interface";
import ResponseI from "../../__interfaces/response.interface";

export interface DiscountType {
  date?: string;
  discount_id?: string;
  discount_value?: number;
  operator_name?: string;
  terminal_serial?: string;
  total_products?: number;
  total_value?: number;
}

export interface DiscountResponse extends ResponseI<DiscountType> {
  totalDiscount?: number;
  totalQuantity?: number;
  totalValue?: number;
}

export interface discountParams extends ParamsI {
  s?: string;
  f?: string;
  event_id?: string;
}
