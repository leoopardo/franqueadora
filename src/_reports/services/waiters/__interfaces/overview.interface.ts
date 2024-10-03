export interface PaymentMethods {
  pix_total: number;
  money_total: number;
  debit_card_total: number;
  credit_card_total: number;
  others_total: number;
  pix_percentage: number;
  money_percentage: number;
  debit_card_percentage: number;
  credit_card_percentage: number;
  others_percentage: number;
}
export interface TotalsData {
  sold_total: number;
  median_ticket: number;
  waiter_fee: number;
  refund_total: number;
  discount_total: number;
  ticket_value: number;
}
export interface ProductsSoldData {
  name: string;
  quantity: string;
  total: string;
}
export interface ReturnsData {
  name: string;
  quantity: string;
  total: string;
}
export interface ReprintsData {
  name: string;
  quantity: string;
  total: string;
}
