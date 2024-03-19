import type { ApiBaseResponse, RequestParams } from '@domain/entities/Api'
export interface IBaseRepository<T> {
  getAll(url?: string, params?: RequestParams): Promise<ApiBaseResponse<T> | null>
  getById(id: string, url?: string): Promise<ApiBaseResponse<T> | null>
  get(data: Record<string, any>, url?: string): any
  create(entity: Partial<T>, url?: string): any
  update(id: string, entity: Partial<T>, url?: string): any
  delete(id: string, url?: string): any
}
