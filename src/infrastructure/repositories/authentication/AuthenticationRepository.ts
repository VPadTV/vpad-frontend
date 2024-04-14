import type { HttpClient } from '@infrastructure/repositories/shared/HttpClient'
import type { LoginRequest, LoginOrRegisterResponse, RegisterRequest } from '@/domain/entities/Authentication'
import { BaseRepository } from '../shared/BaseRepository'

export class AuthenticationRepository extends BaseRepository {
    constructor(public httpClient: HttpClient) {
        super(httpClient)
    }

    async register(req: RegisterRequest) {
        return await this.httpClient.post<LoginOrRegisterResponse>('/user/register', new URLSearchParams(req as any))
    }

    async login(req: LoginRequest) {
        return await this.httpClient.post<LoginOrRegisterResponse>('/user/login', new URLSearchParams(req as any))
    }
}
