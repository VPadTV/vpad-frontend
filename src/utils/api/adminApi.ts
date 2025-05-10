import { fetchApi } from '@/utils/api';
import { User } from '@/types/admin';

export interface AdminUsersResponse {
  users: User[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface BanUserRequest {
  id: string;
  banned: boolean;
  banTimeout?: string | null;
}

export interface AdminUserRequest {
  id: string;
  admin: boolean;
}


export const getAdminUsers = async (): Promise<AdminUsersResponse> => {
  return await fetchApi<AdminUsersResponse>('/admin', {
    method: 'GET',
  });
};

export const toggleUserAdmin = async (request: AdminUserRequest): Promise<User> => {
    return await fetchApi<User>(`/admin/manage/admin/${request.id}?admin=${request.admin}`, {
    method: 'PUT',
      });
};

export const banUser = async (request: BanUserRequest): Promise<User> => {
  return await fetchApi<User>(`/admin/manage/ban/${request.id}?banned=${request.banned}&banTimeout=${request.banTimeout}`, {
    method: 'PUT',
  });
};
