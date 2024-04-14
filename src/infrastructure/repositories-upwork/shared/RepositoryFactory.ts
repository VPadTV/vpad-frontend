import axios, { type AxiosInstance } from 'axios'
import { ApiPaths, RepositoryTypes } from '@infrastructure/constants'
import { HttpClient } from '@/infrastructure/repositories/shared/HttpClient'
import { PostRepository } from '@/infrastructure/repositories/post/PostRepository'
import { AuthenticationRepository } from '@/infrastructure/repositories/authentication/AuthenticationRepository'

export class RepositoryFactory {
    public static axiosInstance: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL
    })

    public static createRepository(type: RepositoryTypes) {
        switch (type) {
            case RepositoryTypes.Authentication:
                return new AuthenticationRepository(
                    new HttpClient(this.axiosInstance, ApiPaths.Authentication)
                )
            case RepositoryTypes.Post:
                return new PostRepository(new HttpClient(this.axiosInstance, ApiPaths.Post))
            default:
                throw new Error('Invalid repository type')
        }
    }
}
