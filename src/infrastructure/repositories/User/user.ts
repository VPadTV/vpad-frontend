import { asFormData } from "@/modules/shared/helpers";
import { HTTP, callAPI } from "../../api";
import type { UserEditBody, UserGetManyBody, UserGetManyResponse, UserGetResponse } from "./user.types";

const BASE = 'user'
export abstract class UserRepository {
    static get = async (id: string) => await callAPI<UserGetResponse>(`${BASE}/${id}`, HTTP.GET)
    static getMany = async (body: UserGetManyBody) => await callAPI<UserGetManyResponse>(`${BASE}`, HTTP.GET, body)
    static update = async (id: string, body: UserEditBody) => callAPI<{}>(`${BASE}/${id}`, HTTP.PUT, asFormData(body))
}