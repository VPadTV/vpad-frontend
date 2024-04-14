import { HTTP, callAPI } from "../../api"

export type CreateSubTierBody = {
    name: string
    price: string
}
export async function createSubTier(body: CreateSubTierBody) {
    await callAPI<void>('tier', HTTP.PUT, new URLSearchParams(body))
}