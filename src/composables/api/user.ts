import type { User } from "@/types/entities";
import { api } from "./base";
import { asFormData } from "@/utils";

export async function getUser(id: string): Promise<User | undefined> {
    const user = await api<User>(`user/${id}`, 'get')
    if (!user) return undefined;
    return {
        ...user,
        id,
    };
}

export type UserEditBody = {
    username?: string
    nickname?: string
    about?: string
    email?: string
    password?: string
    profilePhoto?: Blob
}
export async function updateUser(id: string, body: UserEditBody): Promise<boolean> {
    const response = await api<{}>(`user/${id}`, 'put', asFormData(body))
    if (response) return true;
    return false;
}