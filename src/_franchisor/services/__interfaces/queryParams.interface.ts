export default interface ParamsI {
  page: number;
  size: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  sort_order?: "asc" | "desc";
  sort_field?: string;

}
