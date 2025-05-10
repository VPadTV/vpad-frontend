import { fetchApi } from "../api";

export interface SubCreateRequest {
  tierId: string;
}

export interface SubCreateResponse {}

export interface SubDeleteResponse {}

export interface SubGetResponse {
  id: string;
  tier: {
    id: string;
    name: string;
    price: number;
  } | null;
}

export const createSub = async (data: SubCreateRequest): Promise<SubCreateResponse> => {
  return fetchApi<SubCreateResponse>('/sub', {
    method: 'POST',
    params: data
  });
};

export const deleteSub = async (id: string): Promise<SubDeleteResponse> => {
  return fetchApi<SubDeleteResponse>(`/sub/${id}`, {
    method: 'DELETE'
  });
};

export const getSubscription = async (creatorId: string): Promise<SubGetResponse> => {
  return fetchApi<SubGetResponse>(`/sub/${creatorId}`, {
    method: 'GET'
  });
};
