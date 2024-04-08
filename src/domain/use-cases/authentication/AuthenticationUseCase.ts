import type { IAuthenticationRepository } from '@/domain/interfaces/authentication/IAuthenticationRepository'
import { LoginResponse, LoginRequest, RegisterRequest } from '@domain/entities/Authentication'

export class AuthenticationUseCase {
  constructor(private readonly repository: IAuthenticationRepository) {}

  async createUser(user: RegisterRequest): Promise<LoginResponse | undefined> {
    return this.repository.create(user, '/register')
  }

  async login(user: LoginRequest): Promise<LoginResponse | undefined> {
    return this.repository.get(user, '/login')
  }
}
