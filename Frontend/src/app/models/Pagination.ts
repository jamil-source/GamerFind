export interface Pagination {
    CurrentPage: number;
    ItemsPerPage: number;
    TotalItems: number;
    TotalPages: number;
}

export class Paginated<T> {
    result: T;
    pagination: Pagination;
}

