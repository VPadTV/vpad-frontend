import { fetchApi } from "../api"; 

export interface Tier {
  id: string;
  name: string;
  price: number;
}

export interface TierCreateRequest {
  name: string;
  price: string;
}

export interface TierCreateResponse {
  id: string;
}

export interface TierUpdateRequest {
  name: string;
}

export interface TierUpdateResponse {}

export interface TierDeleteResponse {}

export interface GetTiersResponse {
  tiers: Tier[];
}

export const createTier = async (data: TierCreateRequest): Promise<TierCreateResponse> => {
  return fetchApi<TierCreateResponse>('/tier', {
    method: 'POST',
    params: data
  });
};

export const getTiers = async (creatorId: string): Promise<GetTiersResponse> => {
  return fetchApi<GetTiersResponse>(`/tier/creator/${creatorId}`);
};

export const updateTier = async (id: string, data: TierUpdateRequest): Promise<TierUpdateResponse> => {
  return fetchApi<TierUpdateResponse>(`/tier/${id}`, {
    method: 'PUT',
    params: data
  });
};

export const deleteTier = async (id: string): Promise<TierDeleteResponse> => {
  return fetchApi<TierDeleteResponse>(`/tier/${id}`, {
    method: 'DELETE'
  });
};
