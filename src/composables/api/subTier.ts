import { api } from "./base"

export type CreateSubTierBody = {
    name: string
    price: string
}
export async function createSubTier(body: CreateSubTierBody) {
    await api<void>('tier', 'post', new URLSearchParams(body))
}