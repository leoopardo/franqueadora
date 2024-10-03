export interface OverviewData {
  average_ticket: string;
  cash_payments: string;
  cashless_payments: string;
  credit_payments: string;
  debit_payments: string;
  others_payments: string;
  pix_payments: string;
  total_value: string;
}
export interface TotalsData {
  cashless_recharges: string;
  contributions_in: string;
  contributions_out: string;
  discounts: string;
  operator_sales: string;
  refunds: string;
  waiter_fee: string;
  waiter_sales: string;
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
