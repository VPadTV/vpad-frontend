export type RegisterBody = {
    username: string
    nickname?: string
    email: string
    password: string
    about?: string
}

export type LoginBody = {
    emailOrUsername: string
    password: string
}