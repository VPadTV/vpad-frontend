import { IncomingHttpHeaders } from 'http';
import { UserProfile } from './Util';

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
  headers?: IncomingHttpHeaders;
}

export interface RegisterRequest {
  username: string;
  nickname?: string;
  email: string;
  password: string;
  about?: string;
  headers?: IncomingHttpHeaders;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  id?: string;
}
