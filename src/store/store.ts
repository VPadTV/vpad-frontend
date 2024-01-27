import type { Post } from "@/types/entities";
import { listOf } from "@/utils/mock/listOf";
import { post } from "@/utils/mock/post";
import { reactive } from "vue";

export const store = reactive<{
    posts: Post[],
    userAuth?: {
        token: string,
        id: string,
    }
}>({
    posts: listOf(post),
})