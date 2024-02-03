import { asFormData } from "@/utils"
import { api } from "./base"
import type { Paginate, Post } from "@/types/entities"
import type { PostGetManyResponse } from "@/types/responses"

export type PostCreateBody = {
    title: string
    text: string
    media: File
    thumb?: File
    nsfw?: boolean
    tags: string[]
}
export async function createPost(body: PostCreateBody): Promise<boolean> {
    const response = await api<{}>(`post`, 'post', asFormData(body));
    if (response) return true;
    return false;
}
export async function voteOnPost(id: string, body: { vote: number }): Promise<boolean> {
    const response = await api<{}>(`vote/${id}`, 'put', new URLSearchParams({
        vote: body.vote.toString(),
    }));
    if (response) return true;
    return false;
}

export async function getPost(id: string): Promise<Post | undefined> {
    return api<Post>(`post/${id}`, 'get');
}

export type SortBy = 'latest' | 'oldest' | 'high-views' | 'low-views'
export type PostGetManyBody = {
    userTierId?: string
    creatorId?: string
    sortBy: SortBy
    titleSearch?: string,
    nsfw: boolean
    page: number
    size: number
}
export async function getManyPosts(body: PostGetManyBody): Promise<Paginate<PostGetManyResponse> | undefined> {
    return api<Paginate<PostGetManyResponse>>(`post`, 'get', new URLSearchParams({
        ...body,
        nsfw: `${body.nsfw}`,
        page: `${body.page}`,
        size: `${body.size}`,
    }));
}