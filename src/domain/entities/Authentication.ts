export interface LoginRequest {
    emailOrUsername: string
    password: string
}

export interface RegisterRequest {
    username: string
    nickname?: string
    email: string
    password: string
    about?: string
}


export interface LoginOrRegisterResponse {
    id: string
    token: string
}