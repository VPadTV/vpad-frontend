import { HTTP, callAPI } from "../../api"
import type { LoginBody, RegisterBody } from "./auth.types"

const BASE = 'user'
export abstract class AuthenticationRepository {
    static register = async (body: RegisterBody) => await callAPI(`${BASE}/register`, HTTP.POST, new URLSearchParams(body))
    static login = async (body: LoginBody) => await callAPI(`${BASE}/login`, HTTP.POST, new URLSearchParams(body))
}