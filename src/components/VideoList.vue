<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { get } from '../lib/api'
import LikeIcon from './LikeIcon.vue';
import DislikeIcon from './DislikeIcon.vue';

let videos: Ref<{ id: number, title: string }[] | null> = ref(null)

onMounted(async () => {
    videos.value = await get('url', {})
})

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<template>
    <main class="videos">
        <RouterLink :to="`/post/${video.id}`" class="video" v-for="video in videos" :key="video.id">
            <div class="thumbnail"></div>
            <p class="text">
                <span class="title">{{ video.title }}</span>
                <RouterLink :to="`/user/x`" class="author">Guy Person</RouterLink>
                <span class="meta">
                    <span class="votes">
                        100 <LikeIcon></LikeIcon>
                        50 <DislikeIcon></DislikeIcon>
                    </span>
                    <span>2024-01-01</span>
                </span>
            </p>
        </RouterLink>
    </main>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';

@function rand($min, $max) {
  $rand: random();
  $randomNum: $min + floor($rand * (($max - $min) + 1));

  @return $randomNum;
}

main {
    $gap: 2rem;
    columns: 6 200px;
    gap: $gap;
    padding: 1.5rem 1.5rem 0;

    @for $i from 1 through 104 { 
        .video:nth-child(#{$i}) .thumbnail {
            $h: (rand(200, 400)) + px;
            height: $h;
            line-height: $h;
        }
    }

    .video {
        width: 100%;
        display: inline-block;
        margin-bottom: $gap;
        .thumbnail {
            background-color: gray;
        }
        
        .text {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            * {
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
                margin-right: 0.25rem;
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
