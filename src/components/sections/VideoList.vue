<script setup lang="ts">
import UserProfilePicture from '../UserProfilePicture.vue';

import { onMounted, ref, type Ref } from 'vue';
import { get } from '@/lib/api'
import { formatNumber } from '@/lib/helpers';
import type { Video } from '@/lib/types';


let videos: Ref<Video[] | null> = ref(null)

onMounted(async () => {
    videos.value = (await get<Video[]>('url', {})).map(video => ({
        ...video,
        likes: formatNumber(video.likes),
        dislikes: formatNumber(video.dislikes),
    })).splice(0, 20)
})

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSize() {
    return {
        height: `${rand(200, 500)}px`,
    }
}
</script>

<template>
    <section class="videos">
        <RouterLink :to="`/post/${video.id}`" class="video" v-for="video in videos" :key="video.id">
            <img class="thumbnail" :style="getRandomSize()"/>
            <p class="text">
                <span class="title">{{ video.title }}</span>
                <RouterLink :to="`/user/x`" class="author">
                    <UserProfilePicture :userId="video.author" />
                    <span>{{ video.author }}</span>
                </RouterLink>
                <span class="date">{{ video.createdAt.toLocaleDateString() }}</span>
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
    padding: 4rem 6rem 0;
    overflow-y: scroll;

    .video {
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

            * {
                text-align: center;
                overflow: hidden;
                max-height: 2lh;    
                max-width: 100%;
            }

            .author {
                img {
                    height: 1lh;
                    vertical-align: middle;
                    margin-right: .3rem;
                }
                span {
                    height: 1lh;
                    vertical-align: middle;
                }
            }

            .author:hover {
            }

            .date {
                color: $text-faded;
            }
        }
    }
}

</style>
