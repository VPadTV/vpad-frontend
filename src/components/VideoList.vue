<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { get } from '../lib/api'
import LikeIcon from './LikeIcon.vue';
import DislikeIcon from './DislikeIcon.vue';
import { formatNumber } from '@/lib/helpers';

export type Video = { id: number, title: string, author: string, likes: number | string, dislikes: number | string }

let videos: Ref<Video[] | null> = ref(null)

onMounted(async () => {
    videos.value = (await get<Video[]>('url', {})).map(video => ({
        ...video,
        likes: formatNumber(video.likes),
        dislikes: formatNumber(video.dislikes),
    }))
})

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSize() {
    return {
        width: `${rand(200, 400)}px`,
        height: `${rand(200, 500)}px`,
    }
}
</script>

<template>
    <section class="videos">
        <RouterLink :to="`/post/${video.id}`" class="video" v-for="video in videos" :key="video.id">
            <div class="thumbnail" :style="getRandomSize()"></div>
            <p class="text">
                <span class="title">{{ video.title }}</span>
                <RouterLink :to="`/user/x`" class="author">{{ video.author }}</RouterLink>
                <span class="meta">
                    <span class="votes">
                        {{ video.likes }} <LikeIcon></LikeIcon>
                        {{ video.dislikes }} <DislikeIcon></DislikeIcon>
                    </span><br/>
                    <span>2024-01-01</span>
                </span>
            </p>
        </RouterLink>
    </section>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';

section {
    $gap: 2rem;
    columns: 5 200px;
    gap: $gap;
    padding: 4rem 6rem 0;
    overflow-y: scroll;

    .video {
        width: 100%;
        display: inline-block;
        margin-bottom: $gap;
        .thumbnail {
            max-width: 250px;
            background-color: gray;
            margin: auto;
        }
        
        .text {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            * {
                text-align: center;
                max-width: 100%;
                color: $text;
                overflow: hidden;
                max-height: 2lh;    
            }

            .author:hover {
                color: $link;
                filter: unset;
            }

            .votes {
                display: inline-flex;
                column-gap: 0.25rem;
                flex-direction: row;
                align-items: center;
            }

            svg {
                height: 1rem;
                width: 1rem;
                display: inline;
            }

            svg.dislike {
                transform: scaleY(-1);
            }
        }
    }
}

</style>
