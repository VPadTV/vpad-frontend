import type { UserAuth } from "@/domain/entities/Authentication"
import { HTTP, callAPI } from "../../api"
import type { LoginBody, RegisterBody } from "./auth.types"

export abstract class AuthenticationRepository {
    static async register(body: RegisterBody) {
        const data = await callAPI<UserAuth>('user/register', HTTP.POST, new URLSearchParams(body))
        if (!data) return undefined;
        return data;
    }

    static async login(body: LoginBody) {
        const data = await callAPI<UserAuth>('user/register', HTTP.POST, new URLSearchParams(body))
        if (!data) return undefined;
        return data;
    }
}