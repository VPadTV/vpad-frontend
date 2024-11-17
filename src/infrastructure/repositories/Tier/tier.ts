import type { TierCreateBody, TierUpdateBody, Tier } from './tier.types.js'
import { callAPI, HTTP } from '@infrastructure/api/index.js'

const BASE = 'tier'
export abstract class TierRepository {
    static create = (body: TierCreateBody) => callAPI<{}, TierCreateBody>(BASE, HTTP.POST, body);
    static get = (id: string) => callAPI<Tier>(`${BASE}/${id}`, HTTP.GET);
    static update = (body: TierUpdateBody) => callAPI<{}, TierUpdateBody>(`${BASE}/${body.id}`, HTTP.PUT, body);
    static getManyCreator = (creatorId: string) => callAPI<{ tiers: Tier[] }>(`${BASE}/creator/${creatorId}`, HTTP.GET);
    static delete = (id: string) => callAPI<{}>(`${BASE}/${id}`, HTTP.DELETE);
}
