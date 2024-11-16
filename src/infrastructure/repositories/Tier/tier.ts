import type { TierCreateBody, TierUpdateBody, Tier } from './tier.types.js'
import { callAPI, HTTP } from '@infrastructure/api/index.js'

export abstract class TierRepository {
  static create = (body: TierCreateBody) => callAPI<{}, TierCreateBody>('tier', HTTP.POST, body);
  static get = (id: string) => callAPI<Tier>(`tier/${id}`, HTTP.GET);
  static update = (body: TierUpdateBody) => callAPI<{}, TierUpdateBody>(`tier/${body.id}`, HTTP.PUT, body);
  static getManyCreator = (creatorId: string) => callAPI<{tiers: Tier[]}>(`tier/creator/${creatorId}`, HTTP.GET);
  static delete = (id: string) => callAPI<{}>(`tier/${id}`, HTTP.DELETE);
}
