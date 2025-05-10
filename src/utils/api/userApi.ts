import { fetchApi, getToken } from '@/utils/api';
import { UserProfile } from '@/types/Util';
import axios from 'axios';
export interface FileRawUpload {
  buffer: Buffer | string;
  mimetype: string;
  size?: number;
  filename?: string;
}

export interface UserEditRequest {
  username?: string;
  nickname?: string;
  email?: string;
  password?: string;
  about?: string;
  customCss?: string;
  highlightPostId?: string;
  profilePhoto?: File;
}

export interface User {
  id: string;
  nickname: string;
  profilePhoto?: string | null;
  bio?: string | null;
  profilePhotoUrl?: string | null; 
}

export interface PaginatedUsers {
  data: User[];
  meta: {
    total: number;
    page: number;
    size: number;
  };
}

export interface ApiPaginatedUsers {
  data: {
    id: string;
    nickname: string;
    profilePhotoUrl: string | null;
    bio?: string | null;
  }[];
  total: number;
  currentPage: number;
  from: number;
  to: number;
  lastPage: number;
}

export interface UsersQueryParams {
  page?: number;
  size?: number;
  search?: string;
  sortBy?: 'nickname' | 'createdAt';
  sortDirection?: 'oldest' | 'latest';
}

/**
 * @param userId
 * @param userData 
 * @returns
 */
export const updateUserProfile = async (
  userId: string,
  userData: UserEditRequest
): Promise<void> => {
  const formData = new FormData();
  
  if (userData.username) formData.append('username', userData.username);
  if (userData.nickname) formData.append('nickname', userData.nickname);
  if (userData.email) formData.append('email', userData.email);
  if (userData.password) formData.append('password', userData.password);
  if (userData.about) formData.append('about', userData.about);
  if (userData.customCss) formData.append('customCss', userData.customCss);
  if (userData.highlightPostId) formData.append('highlightPostId', userData.highlightPostId);
  
  if (userData.profilePhoto) {
    formData.append('profilePhoto', userData.profilePhoto);
  }
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = getToken();
  
  await axios.put(`${API_URL}/user/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

/**
 * @param userId
 * @returns 
 */
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  return await fetchApi<UserProfile>(`/user/${userId}`, {
    method: 'GET',
  });
};

/**
 * @param params
 * @returns 
 */
export const getUsers = async (params: UsersQueryParams): Promise<PaginatedUsers> => {
  const response = await fetchApi<ApiPaginatedUsers>('/user', {
    method: 'GET',
    params: params
  });
  
  return {
    data: response.data.map(user => ({
      id: user.id,
      nickname: user.nickname,  
      profilePhotoUrl: user.profilePhotoUrl,
      bio: user.bio
    })),
    meta: {
      total: response.total > 0 ? response.total : (response.lastPage > 0 ? response.lastPage * params.size! : response.data.length),
      page: response.currentPage,
      size: params.size || 50
    }
  };
};
/**
 * @param username
 * @returns 
 */
export const searchUsersByUsername = async (username: string): Promise<User[]> => {
  const response = await fetchApi<User[]>('/user/username', {
    method: 'GET',
    params: { username }
  });
  
  return response;
};
