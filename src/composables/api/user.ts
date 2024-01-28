import type { User } from "@/types/entities";
import { api } from "./base";

export async function getUser(id: string): Promise<User | undefined> {
    const user = await api<User>(`user/${id}`, 'get')
    if (!user) return undefined;
    return {
        ...user,
        id,
    };
}