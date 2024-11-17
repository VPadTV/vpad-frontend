export type UserSimpleResponse = {
    id: string
    nickname: string
    profilePhotoId?: string
}

export type UserGetResponse = {
    username: string,
    nickname: string,
    email: string,
    profilePhotoUrl: string,
    about?: string,
    contact?: string,
    admin: false
}

export type UserEditBody = {
    username?: string
    nickname?: string
    about?: string
    email?: string
    password?: string
    profilePhoto?: File
}