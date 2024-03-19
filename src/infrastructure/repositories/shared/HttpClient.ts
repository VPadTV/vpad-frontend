import { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export class HttpClient {
  private readonly instance: AxiosInstance
  private readonly baseUrl: string

  constructor(instance: AxiosInstance, baseUrl: string) {
    this.instance = instance
    this.baseUrl = baseUrl
  }

  async get<T = unknown>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.get<T>(`${this.baseUrl}${url}`, { params, ...config })
    return data
  }

  async post<T = unknown>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.post<T>(`${this.baseUrl}${url}`, body, config)
    return data
  }

  async put<T = unknown>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.put<T>(`${this.baseUrl}${url}`, body, config)
    return data
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.delete<T>(`${this.baseUrl}${url}`, config)
    return data
  }
}
