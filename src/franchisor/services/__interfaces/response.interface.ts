export default interface ResponseI<itemI> {
  items: itemI[];
  totalItems: number;
  page: number;
  size: number;
  sortableColumns: { key: string; value: string }[];
}
