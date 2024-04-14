import axios, { type AxiosInstance } from 'axios'
import { AuthenticationRepository } from './authentication/AuthenticationRepository.js'
import { HttpClient } from './shared/HttpClient.js'
import { ApiPaths } from '../constants'
import { PostRepository } from './post/PostRepository.js'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const authenticationRepository = new AuthenticationRepository(new HttpClient(axiosInstance, ApiPaths.Authentication))
const postRepository = new PostRepository(new HttpClient(axiosInstance, ApiPaths.Post))

export {
    authenticationRepository,
    postRepository
}