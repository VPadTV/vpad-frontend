import { HTTP, callAPI } from "../../api"
import type { ManageAdminBody, ManageBanBody } from "./admin.types"

const BASE = 'admin'
export abstract class AuthenticationRepository {
    static getMany = async () => await callAPI(BASE, HTTP.GET)
    static manageAdmin = async (body: ManageAdminBody, id: string) => await callAPI(`${BASE}/manage/admin/${id}`, HTTP.POST, body)
    static manageBan = async (body: ManageBanBody, id: string) => await callAPI(`${BASE}/manage/ban/${id}`, HTTP.POST, body)
}

