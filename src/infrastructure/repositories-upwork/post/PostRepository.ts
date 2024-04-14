import { BaseRepository } from '../shared/BaseRepository.js'
import type { Post } from '@/domain/entities/Posts'
import type { HttpClient } from '../shared/HttpClient.js'
import { asFormData } from '@/modules/shared/helpers'
import type { RequestParams } from '@/domain/entities/Api'

export class PostRepository extends BaseRepository {
    constructor(public httpClient: HttpClient) {
        super(httpClient)
    }

    async create(entity: Partial<Post>) {
        return this.httpClient.post<unknown>('/post', asFormData(entity))
    }

    async update(id: string, body: Partial<Post>) {
        return this.httpClient.put<unknown>(`/post/${id}`, asFormData(body))
    }

    async delete(id: string) {
        return this.httpClient.delete<unknown>(`/post/${id}`)
    }

    async getAll(params?: RequestParams) {
        return this.httpClient.get<unknown>('/post', new URLSearchParams(params as any))
    }

    async getById(id: string) {
        return this.httpClient.get<unknown>(`/post/${id}`)
    }

    duplicate() { }
}
