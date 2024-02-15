<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import { MediaType, type Post, type User, type UserComment } from '@/types/entities';
import ViewImage from '../ViewImage.vue';
import LikeIcon from '../icons/LikeIcon.vue';
import { formatDate, formatNumber } from '@/utils';
import { ref } from 'vue';
import { PostAPI } from '@/composables/api/post';
import { loadOrGetUser } from '@/composables/loadOrGetUser';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import ViewVideo from '../ViewVideo.vue';
import router from '@/router';
import { Voting } from '@/composables/voting';
import CommentList from './CommentList.vue';
import TrashIcon from '../icons/TrashIcon.vue';
import TextAreaInputField from '../forms/TextAreaInputField.vue';

const { post, postScale } = defineProps<{
    post: Post,
    postScale: number
}>()

const testAuthors = [
    {
        id: "a",
        nickname: "hello"
    },
    {
        id: "b",
        nickname: "world"
    },
    {
        id: "c",
        nickname: "from authors"
    },
]

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

const user = ref<User>()
const voting = ref<Voting>()
loadOrGetUser(useRouter(), false).then(u => {
    user.value = u
    if (!user.value) return
    voting.value = new Voting(user.value, post)
})

const comment = ref<string>()

const comments: UserComment[] = [
    {
        id: 'a', body: "sexkldajslkdajdjsaldjalsjsadjasldsadla jsdjsalksadsexkldajslkdajdjsaldjalsjsadjasldsadlajs djsalksadsexkldajslkdajdjsaldjalsjsadjasl dsadlajsdjsalksadsexkldajslkdajdjsaldjalsjsadjasldsadlajsdjsalksadsexkldajslkdajdjsaldjalsjsadjasldsadlajsdjsalksadsexkldajslkdajdjsaldjalsjsadjasldsadlajsdjsalksadsexkldajslkdajdjsaldjalsjsadjasldsadlajsdjsalksadsexkldajslkdajdjsaldjalsjsadjasldsadlajsdjsalksadsexkldajslkdajdjsaldjalsjsadjasldsadlajsdjsalksad", children: [
            {
                id: 'd', body: "hello", children: [
                    { id: 'f', body: "world", children: [] },
                ]
            },
            { id: 'g', body: "sadasdsa", children: [] },
            { id: 'h', body: "yuutyuytuyt", children: [] },

        ]
    },
    { id: 'b', body: "gjhghgjhgjhg", children: [] },
    { id: 'c', body: "bxcxbcbxcb", children: [] },
]

function createComment(c: string | undefined) {
    console.log(c);
}

function cancelComment() {
    comment.value = ''
}

</script>

<template>
    <section class="post">
        <div class="post-actions" v-if="user && post.meta.authors.some((author) => author.id === user!.id)">
            <button class="delete" @click="deleteClicked">
                <TrashIcon />
            </button>
        </div>
        <section class="content-background">
            <ViewImage v-if="post.mediaType === MediaType.IMAGE" :post="post" :style="{ width: `${postScale}%` }" />
            <ViewVideo v-else-if="post.mediaType === MediaType.VIDEO" :post="post" :style="{ width: `${postScale}%` }" />
        </section>
        <div class="data">
            <span class="title">{{ post?.title }}</span>
            <ul class="authors">
                <RouterLink v-for="author in testAuthors" :key="author.id" :to="`/user/${author.id}`" class="author">
                    <UserProfilePicture class="pfp" :id="author.id" />
                    <span>{{ author.nickname }}</span>
                </RouterLink>
            </ul>
            <p class="date">{{ formatDate(post.meta.createdAt) }}</p>
            <p class="views"><span>{{ formatNumber(post.meta.views) }}</span> Views</p>
            <section class="votes">
                <p class="likes">
                    <span>{{ formatNumber(voting?.likeData.likes ?? 0) }}</span>
                    <LikeIcon :class="{ active: voting?.likeData.myVote === 1 }" class="like" @click="voting?.vote(1)" />
                </p>
                <p class="dislikes">
                    <span>{{ formatNumber(voting?.likeData.dislikes ?? 0) }}</span>
                    <LikeIcon :class="{ active: voting?.likeData.myVote === -1 }" class="dislike"
                        @click="voting?.vote(-1)" />
                </p>
            </section>
        </div>
        <details class="comments">
            <summary></summary>
            <form @submit.prevent class="create-comment">
                <TextAreaInputField resize="vertical" v-model="comment">Comment</TextAreaInputField>
                <button class="cancel" @click.prevent="cancelComment()">Cancel</button>
                <button class="create" @click="createComment(comment)">Create</button>
            </form>
            <CommentList :comments="comments" />
        </details>

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

.loading-spinner {
    padding: 1rem;
}

.post-actions {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: .75rem;
    justify-content: flex-end;
    align-items: flex-end;

    .delete {
        font-size: 1.1rem;
        border: none;
        border-radius: 1rem;
        padding: .6rem;
        background-color: $light-red;
        box-shadow: 1px 1px 4px 4px #0004;

        svg {
            vertical-align: middle;
            width: 1.5rem;
            height: 1.5rem;
        }
    }
}

.data {
    max-width: 100%;
    display: grid;
    grid-template:
        calc(min-content + 5px) minmax(2rem, auto) auto /
        auto auto;
    grid-auto-flow: column;
    border: 5px solid $main;
    border-top: none;
    border-bottom: none;
    padding: 1.5rem;
    align-items: center;
    gap: 5px;

    .views {
        justify-self: flex-end;
        grid-row: 1;
    }

    .votes {
        grid-row: 2 / 4;
        align-self: start;
    }

    .authors {
        align-self: center;
        display: inline-flex;
        flex-direction: column;
        row-gap: .2rem;
    }

    .title {
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
            fill: $accent;
        }

        .dislike {
            position: relative;
            top: 6px;
            fill: $red;
            rotate: 180deg;
            transform: scaleX(-1);
        }
    }
}

.create-comment {
    max-width: 100%;
    padding: 1rem 1rem 0;
    display: grid;
    grid-template-rows: auto 2lh;
    grid-template-columns: auto 12ch 12ch;
    grid-template-areas:
        "input input input"
        ". cancel create";
    gap: .5rem;

    .input-field {
        grid-area: input;
    }

    button {
        border: 0;
        background-color: $main;
        font-size: 1rem;
    }

    button.cancel {
        grid-area: cancel;
    }

    button.cancel:hover {
        background-color: $light-red;
    }

    button.create {
        grid-area: create;
    }

    button.create:hover {
        background-color: $accent;
    }
}

.comments[open] summary::after {
    content: "Close Comments";
}

.comments:not([open]) summary::after {
    content: "View Comments";
}

.comments {
    width: 100%;
    // border: 5px solid $main;
    background-color: $main-dark;
    border-top: none;
    border-bottom: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    summary:hover {
        cursor: pointer;
    }

    summary {
        list-style: none;
        text-align: center;
        background-color: $main;
        padding: .5rem;
        font-size: 1rem;
        cursor: pointer;
        user-select: none;

        >svg {
            position: relative;
            rotate: -90deg;
            height: $comment-btn-size;
            width: $comment-btn-size;
            z-index: 5;
        }

        >svg.closed {
            rotate: 0;
        }

        >svg:hover {
            cursor: pointer;
        }
    }

    .comment-list {
        padding: 1rem 0;
        padding-right: .5rem;
        // border-bottom: 5px solid $main;
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
            border-top: 2px solid $main-lighter;
        }
    }
}
</style>
