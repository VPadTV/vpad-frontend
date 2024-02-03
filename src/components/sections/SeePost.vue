<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import type { Post } from '@/types/entities';
import ViewImage from '../ViewImage.vue';
import LikeIcon from '../icons/LikeIcon.vue';
import { formatDate, formatNumber, numify } from '@/utils';
import { onMounted, ref } from 'vue';
import { voteOnPost } from '@/composables/api/post';
import { loadOrGetUserRef } from '@/composables/loadOrGetUser';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { store } from '@/store/store';

const { post, postScale } = defineProps<{
    post: Post,
    postScale: number
}>()

const user = loadOrGetUserRef(useRouter(), false)

let likeData = ref({
    likes: numify(post.meta.likes)!,
    dislikes: numify(post.meta.dislikes)!,
    myVote: numify(post.meta.myVote ?? 0)
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
    if (!post.id || previousVote === v) return
    const oldLikeData = { ...likeData.value }
    editLikeData(v)
    store.cursor = 'progress'
    const r = await voteOnPost(post.id, { vote: v })
    if (!r)
        likeData.value = { ...oldLikeData }
    store.cursor = undefined
}

function editLikeData(v: number) {
    const previousVote = likeData.value.myVote
    if (previousVote === 0) {
        if (v === 1) likeData.value.likes += 1
        if (v === -1) likeData.value.dislikes += 1
    } else {
        likeData.value.dislikes -= v
        likeData.value.likes += v
    }
    likeData.value.myVote = v
}

</script>

<template>
    <section class="post" :style="{ cursor: store.cursor }">
        <section class="content-background">
            <ViewImage :post="post" :style="{ width: `${postScale}%` }" />
        </section>
        <div class="data">
            <aside class="left">
                <span class="title">{{ post?.title }}</span>
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
                    <span>{{ formatNumber(likeData.likes) }}</span>
                    <LikeIcon class="like" @click="vote(1)" />
                </p>
                <p class="dislikes">
                    <span>{{ formatNumber(likeData.dislikes) }}</span>
                    <LikeIcon class="dislike" @click="vote(-1)" />
                </p>
            </aside>
        </div>
    </section>
</template> 
  
<style scoped lang="scss">
@import '@/assets/style/base.scss';

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

.loading-spinner {
    padding: 1rem;
}

.data {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    .title,
    .authors {
        margin-bottom: .2rem;
    }

    .authors {
        display: flex;
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
