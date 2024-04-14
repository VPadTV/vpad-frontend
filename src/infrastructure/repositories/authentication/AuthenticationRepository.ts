import { BaseRepository } from '@infrastructure/repositories/shared/BaseRepository'
import type { User } from '@domain/entities/User'
import type { HttpClient } from '@infrastructure/repositories/shared/HttpClient'
import type { LoginRequest, LoginOrRegisterResponse, RegisterRequest } from '@/domain/entities/Authentication'
import type { ApiBaseResponse } from '@/domain/entities/Api'

export class AuthenticationRepository extends BaseRepository<User> {
    constructor(public httpClient: HttpClient) {
        super(httpClient)
    }

    async register(req: RegisterRequest) {
        return this.httpClient.post<ApiBaseResponse<LoginOrRegisterResponse>>('/user/register', req)
    }

    async login(req: LoginRequest) {
        return this.httpClient.post<ApiBaseResponse<LoginOrRegisterResponse>>('/user/login', req)
    }
}
