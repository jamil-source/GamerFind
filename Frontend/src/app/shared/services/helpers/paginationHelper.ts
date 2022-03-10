import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Paginated } from "src/app/models/Pagination";

export function getPaginatedResult<T>(url, params, http: HttpClient){
    const paginatedResult: Paginated<T> = new Paginated<T>();
    return http.get<T>(url, {observe: 'response', params }).pipe(
        map(res => {
            paginatedResult.result = res.body
            if(res.headers.get('Pagination') !== null){
               paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
            }
            return paginatedResult;
        })
    )
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString())
    params = params.append('pageSize', pageSize.toString())

    return params;

}