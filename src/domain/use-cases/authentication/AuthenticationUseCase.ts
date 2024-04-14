import type { AuthenticationRepository } from '@/infrastructure/repositories/authentication/AuthenticationRepository'
import type { LoginRequest, RegisterRequest } from '@domain/entities/Authentication'

export class AuthenticationUseCase {
    constructor(private readonly repository: AuthenticationRepository) { }

    async createUser(req: RegisterRequest) {
        return this.repository.register(req)
    }

    async login(req: LoginRequest) {
        return this.repository.login(req)
    }
}
