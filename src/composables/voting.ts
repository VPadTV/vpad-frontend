import { store } from "@/store/store";
import { onMounted, ref, type Ref } from "vue";
import { useToast } from "vue-toastification";
import { VoteAPI } from "./api/vote";
import type { Post, User } from "@/types/entities";
import { numify } from "@/utils";

export class Voting {
    user: User
    post: Post
    public likeData = ref<{ likes?: number, dislikes?: number, myVote?: number }>()


    public get likes(): number | undefined {
        return this.likeData.value?.likes;
    }
    public get dislikes(): number | undefined {
        return this.likeData.value?.dislikes;
    }
    public get myVote(): number | undefined {
        return this.likeData.value?.myVote;
    }


    constructor(user: User, post: Post) {
        this.user = user
        this.post = post
        this.likeData = ref({
            likes: numify(post.meta.likes)!,
            dislikes: numify(post.meta.dislikes)!,
            myVote: numify(post.meta.myVote ?? 0)!
        })
        onMounted(async () => {
            if (!post.meta.myVote)
                await this.vote(0)
        })
    }

    public async vote(v: number) {
        if (!this.user) {
            return useToast().error('Please login first')
        }
        const previousVote = this.likeData.value!.myVote
        if (!this.post.id) return
        if (previousVote === v) v = 0
        const oldLikeData = { ...this.likeData.value }
        this.editLikeData(v)
        store.cursor = 'progress'
        const r = await VoteAPI.vote(this.post.id, v)
        if (!r)
            this.likeData.value = { ...oldLikeData }
        store.cursor = undefined
    }

    async editLikeData(v: number) {
        const previousVote = this.likeData.value!.myVote
        if (previousVote === 0 || !previousVote) {
            if (v === 1) this.likeData.value!.likes! += 1
            if (v === -1) this.likeData.value!.dislikes! += 1
        } else if (v === 0) {
            if (previousVote === 1)
                this.likeData.value!.likes! -= 1
            else if (previousVote === -1)
                this.likeData.value!.dislikes! -= 1
        }
        else {
            this.likeData.value!.dislikes! -= v
            this.likeData.value!.likes! += v
        }
        this.likeData.value!.myVote = v
    }
}