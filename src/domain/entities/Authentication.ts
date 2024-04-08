export interface LoginRequest {
  emailOrUsername: string
  password: string
}

export interface LoginResponse {
  id: string
  token: string
}

export interface RegisterRequest {
  username: string
  nickname?: string
  email: string
  password: string
  about?: string
}
