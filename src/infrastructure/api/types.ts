export interface ApiErrorResponse {
    error: boolean
    message: string
}

export type ApiBaseResponse<T> = ApiErrorResponse | (T & { token?: string })

export interface Paginate<T> {
    total: number
    to: number
    from: number
    currentPage: number
    lastPage: number
    data: T[]
}

export interface PaginationParams {
    page: number
    size: number
}

export interface FilterParams {
    filters?: { [key: string]: string | number }
}

export type RequestParams = PaginationParams & FilterParams
