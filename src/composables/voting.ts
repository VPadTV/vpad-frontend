import { useToast } from "vue-toastification";
import { VoteAPI } from "./api/vote";
import type { Post, User } from "@/types/entities";
import { numify } from "@/utils";

export type LikeData = {
    likes: number, dislikes: number, myVote: number
}

export class Voting {
    user: User | undefined
    post: Post
    likeData: LikeData

    constructor(user: User | undefined, post: Post) {
        this.user = user
        this.post = post
        this.likeData = {
            likes: numify(post.meta.likes)!,
            dislikes: numify(post.meta.dislikes)!,
            myVote: numify(post.meta.myVote ?? 0)!
        }
        if (!post.meta.myVote)
            this.vote(0)
    }

    public async vote(v: number) {
        if (!this.user && v !== 0) {
            return useToast().error('Please login first')
        }
        const previousVote = this.likeData.myVote
        if (!this.post.id) return
        if (previousVote === v) v = 0
        const oldLikeData = { ...this.likeData }
        this.editLikeData(v)
        const r = await VoteAPI.vote(this.post.id, v)
        if (!r)
            this.likeData = { ...oldLikeData }
    }

    async editLikeData(v: number) {
        const previousVote = this.likeData.myVote
        if (previousVote === 0 || !previousVote) {
            if (v === 1) this.likeData.likes! += 1
            if (v === -1) this.likeData.dislikes! += 1
        } else if (v === 0) {
            if (previousVote === 1)
                this.likeData.likes! -= 1
            else if (previousVote === -1)
                this.likeData.dislikes! -= 1
        }
        else {
            this.likeData.dislikes! -= v
            this.likeData.likes! += v
        }
        this.likeData.myVote = v
    }
}