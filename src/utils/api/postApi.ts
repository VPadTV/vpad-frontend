import { fetchApi, getToken } from '@/utils/api';
import axios from 'axios';

export interface PostCreateRequest {
  title: string;
  text?: string;
  nsfw: boolean;
  tags: string;
  media: File;
  thumb?: File;
  minTierId?: string;
  seriesId?: string;
  credits?: {
    userId: string;
    description: string;
  }[];
}

export interface PostUpdateRequest {
  text?: string;
  nsfw?: boolean;
  tags?: string;
  media?: File;
  thumb?: File;
  minTierId?: string;
  seriesId?: string;
}

export interface PostsQueryParams {
  creatorId?: string;
  sortBy?: 'latest' | 'oldest' | 'high-views' | 'low-views';
  search?: string;
  nsfw?: boolean;
  seriesId?: string;
  tags?: string;
  page?: number;
  size?: number;
  userTierId?: string; 
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createPost = async (postData: PostCreateRequest): Promise<{ id: string }> => {
  const formData = new FormData();
  
  formData.append('title', postData.title);
  if (postData.text) formData.append('text', postData.text);
  formData.append('nsfw', postData.nsfw.toString());
  formData.append('tags', postData.tags);
  if (postData.minTierId) formData.append('minTierId', postData.minTierId);
  if (postData.seriesId) formData.append('seriesId', postData.seriesId);
  
  formData.append('media', postData.media);
  if (postData.thumb) formData.append('thumb', postData.thumb);
  
  if (postData.credits && postData.credits.length > 0) {
    postData.credits.forEach((credit, index) => {
      formData.append(`credits[${index}][userId]`, credit.userId);
      formData.append(`credits[${index}][description]`, credit.description);
    });
  }
  
  const token = getToken();
  
  const response = await axios.post(`${API_URL}/post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  
  return response.data;
};

export const getPosts = async (params: PostsQueryParams = {}) => {
  return await fetchApi('/post', {
    method: 'GET',
    params,
  });
};

export const getPost = async (id: string) => {
  return await fetchApi(`/post/${id}`, {
    method: 'GET',
  });
};

export const updatePost = async (id: string, postData: PostUpdateRequest) => {
  const formData = new FormData();
  
  if (postData.text !== undefined) formData.append('text', postData.text);
  if (postData.nsfw !== undefined) formData.append('nsfw', postData.nsfw.toString());
  if (postData.tags !== undefined) formData.append('tags', postData.tags);
  if (postData.minTierId) formData.append('minTierId', postData.minTierId);
  if (postData.seriesId) formData.append('seriesId', postData.seriesId);
  
  if (postData.media) formData.append('media', postData.media);
  if (postData.thumb) formData.append('thumb', postData.thumb);
  
  const token = getToken();
  
  const response = await axios.put(`${API_URL}/post/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  
  return response.data;
};

export const deletePost = async (id: string) => {
  return await fetchApi(`/post/${id}`, {
    method: 'DELETE',
  });
};

export const streamPost = async (key: string) => {
  return `${API_URL}/post/stream/${key}`;
};
