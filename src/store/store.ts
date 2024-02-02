import type { Post, User } from "@/types/entities";
import { listOf } from "@/utils/mock/listOf";
import { post } from "@/utils/mock/post";
import { reactive } from "vue";

export const store = reactive<{
    posts: Post[]
    user?: User,
}>({
    posts: listOf(post),
})