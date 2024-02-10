<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import { MediaType, type Post, type User } from '@/types/entities';
import ViewImage from '../ViewImage.vue';
import LikeIcon from '../icons/LikeIcon.vue';
import { formatDate, formatNumber, numify } from '@/utils';
import { onMounted, ref, type Ref } from 'vue';
import { PostAPI } from '@/composables/api/post';
import { loadOrGetUserRef } from '@/composables/loadOrGetUser';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { store } from '@/store/store';
import ViewVideo from '../ViewVideo.vue';
import router from '@/router';
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import { VoteAPI } from '@/composables/api/vote';

const { post, postScale } = defineProps<{
    post: Post,
    postScale: number
}>()

const user = loadOrGetUserRef(useRouter(), false)
const likeData = ref({
    likes: numify(post.meta.likes) ?? 0,
    dislikes: numify(post.meta.dislikes) ?? 0,
    myVote: numify(post.meta.myVote) ?? 0
})

onMounted(async () => {
    if (!user.value) return;
    if (!post.meta.myVote)
        await vote(0)
})

async function vote(v: number) {
    if (!user.value) {
        return useToast().error('Please login first')
    }
    const previousVote = likeData.value.myVote
    if (!post.id) return
    if (previousVote === v) v = 0
    const oldLikeData = { ...likeData.value }
    editLikeData(v)
    store.cursor = 'progress'
    const r = await VoteAPI.vote(post.id, v)
    if (!r)
        likeData.value = { ...oldLikeData }
    store.cursor = undefined
}

function editLikeData(v: number) {
    const previousVote = likeData.value.myVote
    if (previousVote === 0 || !previousVote) {
        if (v === 1) likeData.value.likes += 1
        if (v === -1) likeData.value.dislikes += 1
    } else if (v === 0) {
        if (previousVote === 1)
            likeData.value.likes -= 1
        else if (previousVote === -1)
            likeData.value.dislikes -= 1
    }
    else {
        likeData.value.dislikes -= v
        likeData.value.likes += v
    }
    likeData.value.myVote = v
}

async function deleteClicked() {
    const response = await PostAPI.delete(post.id!)
    const toast = useToast()
    if (response) {
        toast.success(response.status)
        router.go(-1)
    } else {
        toast.error('Something went wrong')
    }
}

const comments = [
    { id: 0, body: "sex" },
    { id: 1, body: "penis" },
    { id: 2, body: "vagina" },
]

</script>

<template>
    <section class="post" :style="{ cursor: store.cursor }">
        <div class="post-actions" v-if="user && post.meta.authors.some((author) => author.id === user!.id)">
            <button class="delete" @click="deleteClicked">Delete</button>
        </div>
        <section class="content-background">
            <ViewImage v-if="post.mediaType === MediaType.IMAGE" :post="post" :style="{ width: `${postScale}%` }" />
            <ViewVideo v-else-if="post.mediaType === MediaType.VIDEO" :post="post" :style="{ width: `${postScale}%` }" />
        </section>
        <ul class="comments">
            <ArrowIcon />
        </ul>
        <div class="data">
            <aside class="left">
                <span class="title">{{ post?.title }}</span>
                <br>
                <ul class="authors">
                    <RouterLink v-for="author in post.meta.authors" :key="author.id" :to="`/user/${author.id}`"
                        class="author">
                        <UserProfilePicture class="pfp" :id="author.id" />
                        <span>{{ author.nickname }}</span>
                    </RouterLink>
                </ul>
            </aside>
            <aside class="right">
                <p class="date">{{ formatDate(post.meta.createdAt) }}</p>
                <p class="views"><span>{{ formatNumber(post.meta.views) }}</span> Views</p>
                <p class="likes">
                    <span>{{ formatNumber(likeData.likes ?? 0) }}</span>
                    <LikeIcon class="like" @click="vote(1)" />
                </p>
                <p class="dislikes">
                    <span>{{ formatNumber(likeData.dislikes ?? 0) }}</span>
                    <LikeIcon class="dislike" @click="vote(-1)" />
                </p>
            </aside>
        </div>
    </section>
</template> 
  
<style scoped lang="scss">
@import '@/assets/style/base.scss';

$comment-btn-size: 32px;

.content-background {
    width: 100%;
    background-color: $main;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        max-width: 100%;

        img {
            width: 100%;
            text-align: center;
        }
    }
}

.comments {
    width: 100%;
    // background-color: $main-light;
    // padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    >svg {
        position: relative;
        rotate: -90deg;
        height: $comment-btn-size;
        width: $comment-btn-size;
        z-index: 99;
    }

    >svg:hover {
        cursor: pointer;
    }
}

.loading-spinner {
    padding: 1rem;
}

.post-actions {
    display: flex;
    flex-direction: row;
    padding: .75rem;
    justify-content: flex-end;

    .delete {
        font-size: 1.1rem;
        border: none;
        border-radius: 1rem;
        padding: .6rem;
        background-color: $light-red;
    }
}

.data {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    translate: 0 (-$comment-btn-size);

    .title,
    .authors {
        margin-bottom: .2rem;
    }

    .authors {
        display: inline-flex;
        flex-direction: column;
        row-gap: .2rem;
    }

    .title {
        margin-top: .3rem;
        font-size: 1.4rem;
    }

    .author {
        font-size: 1.2rem;
        display: flex;
        align-items: center;

        .pfp {
            width: .9lh;
            height: .9lh;
            vertical-align: middle;
            margin-right: .4rem;
        }

        span {
            height: 1lh;
            vertical-align: middle;
            display: inline-block;
        }
    }

    .date {
        color: $text-faded;
    }

    .left,
    .right {
        width: 100%;
    }

    .right {
        * {
            text-align: right;
        }
    }

    .likes,
    .dislikes {
        display: flex;
        gap: 1rem;
        font-size: 2rem;
        align-items: center;
        justify-content: flex-end;

        .like,
        .dislike {
            max-height: .8lh;
        }

        .like {
            fill: green;
        }

        .dislike {
            position: relative;
            top: 6px;
            fill: red;
            rotate: 180deg;
            transform: scaleX(-1);
        }
    }

    * {
        text-align: left;
        overflow: hidden;
        max-width: 100%;
    }
}

@media screen and (max-width: $mobile-width-large) {
    .content-background {
        max-height: 700px;
        overflow: hidden;
    }

    .content {
        width: 100% !important;
    }

    .post {
        .data {
            margin: 0rem 1rem 1rem;
        }
    }
}
</style>
