import type { HttpClient } from '../shared/HttpClient.js'
import type { LoginRequest, UserAuth, RegisterRequest } from '@/domain/entities/Authentication'
import { BaseRepository } from '../shared/BaseRepository.js'

export class AuthenticationRepository extends BaseRepository {
    constructor(public httpClient: HttpClient) {
        super(httpClient)
    }

    async register(req: RegisterRequest) {
        return await this.httpClient.post<UserAuth>('/user/register', new URLSearchParams(req as any))
    }

    async login(req: LoginRequest) {
        return await this.httpClient.post<UserAuth>('/user/login', new URLSearchParams(req as any))
    }
}
