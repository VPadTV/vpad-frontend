import { HTTP, callAPI } from "../../api";
import type { UserEditBody, UserGetResponse } from "./user.types";

export abstract class UserRepository {
    static get = async (id: string) => await callAPI<UserGetResponse>(`user/${id}`, HTTP.GET)
    static update = async (id: string, body: UserEditBody) => callAPI<{}>(`user/${id}`, HTTP.PUT, body)
}