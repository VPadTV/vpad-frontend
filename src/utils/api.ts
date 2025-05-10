
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getServerSideToken } from './auth/tokenService';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getTokenFromCookies(): Promise<string | null> {
  if (typeof document === 'undefined') {
    // Server-side - use the server component function
    return await getServerSideToken();
  } 
  else {
    // Client-side - use document.cookie
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    // Client-side
    const localToken = localStorage.getItem('token');
    if (localToken) return localToken;
    return await getTokenFromCookies();
  }
  
  // Server-side
  return await getTokenFromCookies();
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
  data?: any; 
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, params } = options;
  
  try {
    const config: AxiosRequestConfig = {
      method,
      headers,
      params,
    };

    if (body) {
      config.data = body;
    }
    
    const response: AxiosResponse<T> = await axiosInstance(endpoint, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || 'An error occurred');
    }
    throw new Error('An unknown error occurred');
  }
}

export default axiosInstance;
