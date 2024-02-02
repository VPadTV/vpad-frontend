<script setup lang="ts">
import UserProfilePicture from '../UserProfilePicture.vue';

import { ref, watchEffect } from 'vue';
import { getManyPosts, type SortBy } from '@/composables/api/post';
import { formatDate } from '@/utils';
import type { PostGetManyResponse } from '@/types/responses';
import { useRoute } from 'vue-router';

let search = ref<string>()

let { filter } = defineProps<{
    filter?: {
        creatorId?: string,
        sortBy?: SortBy,
        nsfw?: boolean,
        page?: number
    }
}>();
let posts = ref<PostGetManyResponse[]>()

const route = ref(useRoute())
watchEffect(() => {
    const querySearch = route.value.query.search;
    if (typeof querySearch === 'string')
        search.value = querySearch
})

watchEffect(async () => {
    const postsResponse = await getManyPosts({
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

function getThumbnailUrl(post: PostGetManyResponse): string {
    if (post.mediaType === 'IMAGE') {
        return post.thumbUrl ?? post.mediaUrl
    }
    return post.thumbUrl ?? ""
}

</script>

<template>
    <section class="posts">
        <RouterLink :to="`/post/${post.id}`" class="post" v-for="post in posts" :key="post.id">
            <img class="thumbnail" v-lazy="getThumbnailUrl(post)" />
            <p class="text">
                <span class="title">{{ post.title }}</span>
                <RouterLink :to="`/user/${post.meta.authors[0].id}`" class="author">
                    <UserProfilePicture :id="post.meta.authors[0].id" />
                    <span>{{ post.meta.authors[0].nickname }}</span>
                </RouterLink>
                <span class="date">{{ post.meta.createdAt }}</span>
            </p>
        </RouterLink>
    </section>
</template>
  
<style scoped lang="scss">
@import '@/assets/style/base.scss';

section {
    $gap: 2.8rem;
    columns: 300px;
    gap: $gap;
    overflow-y: scroll;

    .post {
        width: 100%;
        display: inline-flex;
        margin-bottom: $gap;
        flex-direction: column;

        .thumbnail {
            align-self: center;
            max-width: 100%;
            height: auto;
            background-color: gray;
        }

        .text {
            max-width: 100%;
            margin-top: .4rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .title,
            .author {
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
</style>
