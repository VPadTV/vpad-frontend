import type { Post } from "@/types/entities";
import { listOf } from "@/utils/mock/listOf";
import { post } from "@/utils/mock/post";
import { reactive } from "vue";

export const store = reactive<{
    posts: Post[]
}>({
    posts: listOf(post)
})