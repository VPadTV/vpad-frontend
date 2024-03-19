import axios, { type AxiosInstance } from 'axios'
import { EApis, ERepositories } from '@infrastructure/constants'
import { HttpClient } from '@infrastructure/repositories/shared/HttpClient'
import { PostRepository } from '@infrastructure/repositories/post/PostRepository'
import { AuthentificationRepository } from '@infrastructure/repositories/authentification/AuthentificationRepository'

export class RepositoryFactory {
  public static axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })

  public static createRepository(type: ERepositories) {
    switch (type) {
      case ERepositories.Authentification:
        return new AuthentificationRepository(
          new HttpClient(this.axiosInstance, EApis.Authentification)
        )
      case ERepositories.Post:
        return new PostRepository(new HttpClient(this.axiosInstance, EApis.Post))
      default:
        throw new Error('Invalid repository type')
    }
  }
}
