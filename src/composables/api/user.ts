import type { User } from "@/types/entities";
import { HTTP, api } from "./base";
import { asFormData } from "@/utils";

export abstract class UserAPI {
    static get = async (id: string) => {
        const response = await api<User>(`user/${id}`, HTTP.GET)
        if (response) return { id, ...response }
    }
    static update = async (id: string, body: UserEditBody) => api<{}>(`user/${id}`, HTTP.PUT, asFormData(body))
}

export type UserEditBody = {
    username?: string
    nickname?: string
    about?: string
    email?: string
    password?: string
    profilePhoto?: Blob
}