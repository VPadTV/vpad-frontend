import { fetchApi } from "../api";

export interface Series {
  id: string;
  name: string;
  data?: any;
}

export interface SeriesCreateRequest {
  name: string;
}

export interface SeriesCreateResponse {
  id: string;
}

export interface SeriesUpdateRequest {
  name: string;
}

export interface SeriesUpdateResponse {}

export interface SeriesDeleteResponse {}

export interface GetSeriesResponse {
  series: Series[];
}

export interface SeriesApiResponse {
  data: Series[];
}

export const createSeries = async (data: SeriesCreateRequest): Promise<SeriesCreateResponse> => {
  return fetchApi<SeriesCreateResponse>('/series', {
    method: 'POST',
    params: data
  });
};

export const getSeries = async (ownerId: string): Promise<SeriesApiResponse> => {
  return fetchApi<SeriesApiResponse>(`/series/${ownerId}`);
};

export const updateSeries = async (id: string, data: SeriesUpdateRequest): Promise<SeriesUpdateResponse> => {
  return fetchApi<SeriesUpdateResponse>(`/series/${id}`, {
    method: 'PUT',
    params: data
  });
};

export const deleteSeries = async (id: string): Promise<SeriesDeleteResponse> => {
  return fetchApi<SeriesDeleteResponse>(`/series/${id}`, {
    method: 'DELETE'
  });
};
