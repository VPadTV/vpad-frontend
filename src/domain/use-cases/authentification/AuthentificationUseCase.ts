import type { IAuthentificationRepository } from '@/domain/interfaces/authentification/IAuthentificationRepository'
import { LoginResponse, LoginRequest, RegisterRequest } from '@domain/entities/Authentification'

export class AuthentificationUseCase {
  constructor(private readonly repository: IAuthentificationRepository) {}

  async createUser(user: RegisterRequest): Promise<LoginResponse | undefined> {
    return this.repository.create(user, '/register')
  }

  async login(user: LoginRequest): Promise<LoginResponse | undefined> {
    return this.repository.get(user, '/login')
  }
}
