import { fetchApi } from '@/utils/api';

export interface CommentCreateRequest {
  postId: string;
  text: string;
  parentId?: string;
}

export interface CommentEditRequest {
  id: string;
  text: string;
}

export interface CommentGetManyRequest {
  postId?: string;
  parentId?: string;
  sortBy?: 'latest' | 'oldest';
  page?: number;
  size?: number;
}

export const createComment = async (comment: CommentCreateRequest) => {
  return await fetchApi(`/comment/create/${comment.postId}?text=${comment.text}&parentId=${comment.parentId}`, {
    method: 'POST',
  });
};

export const getComment = async (id: string) => {
  return await fetchApi(`/comment/${id}`, {
    method: 'GET',
  });
};

export const getComments = async (params: CommentGetManyRequest) => {
  let url = `/comment?`;
  
  if (params.page) url += `page=${params.page}`;
  if (params.postId) url += `&postId=${params.postId}`;
  if (params.sortBy) url += `&sortBy=${params.sortBy}`;
  if (params.size) url += `&size=${params.size}`;
  if (params.parentId) url += `&parentId=${params.parentId}`;

  url = url.replace('?&', '?');
  
  const res = await fetchApi(url, {
    method: 'GET',
  });
  
  return res;
};

export const updateComment = async (comment: CommentEditRequest) => {
  return await fetchApi(`/comment/${comment.id}`, {
    method: 'PUT',
    body: {
      text: comment.text,
    },
  });
};

export const deleteComment = async (id: string) => {
  return await fetchApi(`/comment/${id}`, {
    method: 'DELETE',
  });
};
