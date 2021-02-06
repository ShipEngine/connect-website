export interface PaginatedItems<T> {
  items: T[];
  itemsPerPage: number;
  totalPages: number;
  pageNumber: number;
}
