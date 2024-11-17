export type ManageAdminBody = {
    admin: boolean
}

export type ManageBanBody = {
    banned: boolean
    banTimeout?: Date
}