import { HTTP, callAPI } from "../../api";

export abstract class UserRepository {
    static get = async (id: string) => await callAPI(`user/${id}`, HTTP.GET)
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