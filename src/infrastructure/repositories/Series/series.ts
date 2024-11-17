import { HTTP, callAPI } from "../../api/index.js"
import type { SeriesCreateBody, SeriesGetResponse, SeriesUpdateBody } from "./series.types.js"

const BASE = 'series'
export abstract class SeriesRepository {
    static create = (body: SeriesCreateBody) => callAPI<{}>(BASE, HTTP.POST, body)
    static get = (id: string) => callAPI<SeriesGetResponse>(`${BASE}/${id}`, HTTP.GET)
    static update = (id: string, body: SeriesUpdateBody) => callAPI<{}>(`${BASE}/${id}`, HTTP.PUT, body)
    static delete = (id: string) => callAPI<{}>(`${BASE}/${id}`, HTTP.DELETE)
}
