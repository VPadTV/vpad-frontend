import { ERepositories } from '@/infrastructure/constants'
import { RepositoryFactory } from '@/infrastructure/repositories/shared/RepositoryFactory'
import type { AuthentificationRepository } from '@infrastructure/repositories/authentification/AuthentificationRepository'
import { AuthentificationUseCase } from '@domain/use-cases/authentification/AuthentificationUseCase'

const authentificationRepository = RepositoryFactory.createRepository(
  ERepositories.Authentification
) as AuthentificationRepository

const authentificationUseCase = new AuthentificationUseCase(authentificationRepository)

export { authentificationUseCase }
