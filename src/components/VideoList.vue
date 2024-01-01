<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { get } from '../lib/api'

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
        <div class="video" v-for="video in videos" :key="video.id">
            <div class="thumbnail"></div>
            <a class="title">{{ video.title }}</a>
        </div>
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
    columns: 6 200px;
    column-gap: 1.5rem;
    padding: 1rem;

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
        .thumbnail {
            background-color: gray;
        }
        
        .title {
            display: inline-block;
            max-width: 100%;
            max-height: 2lh;
            overflow: hidden;
        }
    }
}

</style>
