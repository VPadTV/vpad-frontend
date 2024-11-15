import { HTTP, callAPI } from "../../api"
import type { LoginBody, RegisterBody } from "./auth.types"

export abstract class AuthenticationRepository {
    static register = async (body: RegisterBody) => await callAPI('user/register', HTTP.POST, new URLSearchParams(body))
    static login = async (body: LoginBody) => await callAPI('user/register', HTTP.POST, new URLSearchParams(body))
}