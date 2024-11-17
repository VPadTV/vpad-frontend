import { HTTP, callAPI } from "../../api/index.js"
import type { SubCreateBody, SubGetResponse } from "./subscription.types.js"

const BASE = "sub"
export abstract class SubRepository {
    static create = (body: SubCreateBody) => callAPI<{}>(BASE, HTTP.POST, body)
    static get = (creatorId: string) => callAPI<SubGetResponse>(`${BASE}/${creatorId}`, HTTP.GET)
    static delete = (id: string) => callAPI<{}>(`${BASE}/${id}`, HTTP.DELETE)
}
