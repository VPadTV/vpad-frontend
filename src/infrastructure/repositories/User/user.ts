import { HTTP, callAPI } from "../../api";
import type { UserEditBody, UserGetResponse } from "./user.types";

const BASE = 'user'
export abstract class UserRepository {
    static get = async (id: string) => await callAPI<UserGetResponse>(`${BASE}/${id}`, HTTP.GET)
    static update = async (id: string, body: UserEditBody) => callAPI<{}>(`${BASE}/${id}`, HTTP.PUT, body)
}