import { HttpClient } from '@infrastructure/repositories/shared/HttpClient'
import type { IBaseRepository } from '@domain/interfaces/shared/IBaseRepository'
import type { ApiBaseResponse, RequestParams } from '@domain/entities/Api'

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(public httpClient: HttpClient) {}

  async create(entity: Partial<T>, url: string): Promise<ApiBaseResponse<T>> {
    return this.httpClient.post<ApiBaseResponse<T>>(url, entity)
  }

  async update(url: string, body: Partial<T>): Promise<ApiBaseResponse<T>> {
    return this.httpClient.put<ApiBaseResponse<T>>(url, body)
  }

  async delete(url: string): Promise<ApiBaseResponse<T>> {
    return this.httpClient.delete<ApiBaseResponse<T>>(url)
  }

  async getAll(url: string, params?: RequestParams): Promise<ApiBaseResponse<T> | null> {
    return this.httpClient.get<ApiBaseResponse<T>>(url, params)
  }

  async getById(url: string, id: string): Promise<ApiBaseResponse<T> | null> {
    return this.httpClient.get<ApiBaseResponse<T>>(`${url}/${id}`)
  }
}
