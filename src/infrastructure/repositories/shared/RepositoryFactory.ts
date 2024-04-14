import axios, { type AxiosInstance } from 'axios'
import { EApis, ERepositories } from '@infrastructure/constants'
import { HttpClient } from '@infrastructure/repositories/shared/HttpClient'
import { PostRepository } from '@infrastructure/repositories/post/PostRepository'
import { AuthenticationRepository } from '@infrastructure/repositories/authentication/AuthenticationRepository'

export class RepositoryFactory {
  public static axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })

  public static createRepository(type: ERepositories) {
    switch (type) {
      case ERepositories.Authentication:
        return new AuthenticationRepository(
          new HttpClient(this.axiosInstance, EApis.Authentication)
        )
      case ERepositories.Post:
        return new PostRepository(new HttpClient(this.axiosInstance, EApis.Post))
      default:
        throw new Error('Invalid repository type')
    }
  }
}
