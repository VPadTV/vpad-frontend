import { asFormData } from "@/utils"
import { api } from "./base"

export type PostCreateBody = {
    title: string
    text: string
    media: File
    thumb?: File
    nsfw?: boolean
    tags: string[]
}
export async function createPost(body: PostCreateBody): Promise<boolean> {
    const response = await api<{}>(`post`, 'post', asFormData(body))
    if (response) return true;
    return false;
}