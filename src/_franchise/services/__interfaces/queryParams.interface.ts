export default interface ParamsI {
  page: number;
  size: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}
