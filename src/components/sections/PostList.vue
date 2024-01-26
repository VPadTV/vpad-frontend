<script setup lang="ts">
import UserProfilePicture from '../UserProfilePicture.vue';

import { onMounted, ref, type Ref } from 'vue';
import { get } from '@/composables/api/base'
import { formatNumber } from '@/utils';
import type { Post } from '@/types/entities';

let posts: Ref<Post[] | undefined> = ref(undefined)

onMounted(async () => {
    posts.value = (await get<Post[]>('posts'))?.map(post => ({
        ...post,
        likes: formatNumber(post.likes),
        dislikes: formatNumber(post.dislikes),
    })).splice(0, 20)
})

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHeight() {
    return {
        height: `${rand(200, 500)}px`,
    }
}
</script>

<template>
    <section class="posts">
        <RouterLink :to="`/post/${post.id}`" class="post" v-for="post in posts" :key="post.id">
            <div class="thumbnail" :style="getRandomHeight()"></div>
            <p class="text">
                <span class="title">{{ post.title }}</span>
                <RouterLink :to="`/user/${post.author.id}`" class="author">
                    <UserProfilePicture :id="post.author.id" />
                    <span>{{ post.author.nickname }}</span>
                </RouterLink>
                <span class="date">{{ post.createdAt.toLocaleDateString() }}</span>
            </p>
        </RouterLink>
    </section>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';

section {
    $gap: 2.8rem;
    columns: 14rem;
    gap: $gap;
    overflow-y: scroll;

    .post {
        width: 100%;
        display: inline-block;
        margin-bottom: $gap;
        .thumbnail {
            min-width: 100%;
            max-width: 100%;
            height: auto;
            background-color: gray;
            margin: auto;
        }
        
        .text {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .title, .author {
                margin-bottom: .2rem;
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
