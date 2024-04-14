import type { ApiBaseResponse } from '@/domain/entities/Api'
import { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export class HttpClient {
    private readonly instance: AxiosInstance
    private readonly baseUrl: string

    constructor(instance: AxiosInstance, baseUrl: string) {
        this.instance = instance
        this.baseUrl = baseUrl
    }

    async get<T>(url: string, params?: URLSearchParams, config?: AxiosRequestConfig) {
        const { data } = await this.instance.get<ApiBaseResponse<T>>(`${this.baseUrl}${url}`, { params, ...config })
        return data
    }

    async post<T>(url: string, body: URLSearchParams | FormData, config?: AxiosRequestConfig) {
        const { data } = await this.instance.post<ApiBaseResponse<T>>(`${this.baseUrl}${url}`, body, config)
        return data
    }

    async put<T>(url: string, body: URLSearchParams | FormData, config?: AxiosRequestConfig) {
        const { data } = await this.instance.put<ApiBaseResponse<T>>(`${this.baseUrl}${url}`, body, config)
        return data
    }

    async delete<T>(url: string, config?: AxiosRequestConfig) {
        const { data } = await this.instance.delete<ApiBaseResponse<T>>(`${this.baseUrl}${url}`, config)
        return data
    }
}
