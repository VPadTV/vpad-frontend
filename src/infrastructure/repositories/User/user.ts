import type { User } from "@/domain/entities/User";
import { HTTP, callAPI } from "../../api";

export abstract class UserRepository {
    static get = async (id: string) => {
        const response = await callAPI<User>(`user/${id}`, HTTP.GET)
        if (response) return { ...response }
    }
    static update = async (id: string, body: UserEditBody) => callAPI<{}>(`user/${id}`, HTTP.PUT, body)
}

export type UserEditBody = {
    username?: string
    nickname?: string
    about?: string
    email?: string
    password?: string
    profilePhoto?: File
}