<script setup lang="ts">
import UserProfilePicture from '../UserProfilePicture.vue';

import { ref, watchEffect } from 'vue';
import { PostAPI, type SortBy } from '@/composables/api/post';
import { formatDate } from '@/utils';
import { useRoute } from 'vue-router';
import LoadingPage from './LoadingPage.vue';
import ViewThumbnail from '../ViewThumbnail.vue';

let search = ref<string>()

let { filter } = defineProps<{
    filter?: {
        creatorId?: string,
        sortBy?: SortBy,
        nsfw?: boolean,
        page?: number
    }
}>();
let posts = ref()

const route = ref(useRoute())
watchEffect(() => {
    const querySearch = route.value.query.search;
    if (typeof querySearch === 'string')
        search.value = querySearch
})

watchEffect(async () => {
    posts.value = undefined
    const postsResponse = await PostAPI.getMany({
        sortBy: 'latest',
        titleSearch: search.value,
        nsfw: filter?.nsfw ?? false,
        page: 1,
        size: 30,
        ...filter,
    })
    if (postsResponse)
        posts.value = postsResponse?.data.map(post => ({
            ...post,
            meta: {
                ...post.meta,
                createdAt: formatDate(post.meta.createdAt),
            }
        }))
})

</script>

<template>
    <section class="posts" v-if="posts != null">
        <RouterLink :to="`/post/${post.id}`" class="post" v-for="post in posts" :key="post.id">
            <ViewThumbnail :post="post" />
            <p class="text">
                <span class="title">{{ post.title }}</span>
            <ul class="authors">
                <RouterLink v-for="author in post.meta.authors" :key="author.id" :to="`/user/${author.id}`" class="author">
                    <UserProfilePicture class="pfp" :id="author.id" />
                    <span>{{ author.nickname }}</span>
                </RouterLink>
            </ul>
            <span class="date">{{ post.meta.createdAt }}</span>
            </p>
        </RouterLink>
    </section>
    <section v-else>
        <LoadingPage />
    </section>
</template>
  
<style scoped lang="scss">
@import '@/assets/style/base.scss';

.posts {
    $gap: 2.8rem;
    gap: $gap;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    justify-content: space-between;

    .post {
        display: inline-flex;
        flex-direction: column;

        .text {
            max-width: 100%;
            margin-top: .4rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .title,
            .authors {
                margin-bottom: .1rem;
            }

            * {
                text-align: left;
                overflow: hidden;
                max-height: 2lh;
                max-width: 100%;
            }

            .author {
                svg {
                    height: 1lh;
                    width: 1lh;
                    vertical-align: middle;
                    margin-right: .3rem;
                }

                span {
                    height: 1lh;
                    vertical-align: middle;
                }
            }

            .date {
                color: $text-faded;
            }
        }
    }
}

@media screen and (max-width: $mobile-width-large) {
    .posts {
        width: 100%;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
