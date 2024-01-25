<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import PostList from '@/components/sections/PostList.vue';

import { onMounted, ref } from 'vue';
import type { Post } from '@/types/entities';
import { numify } from '@/utils';

const { post } = defineProps<{
    post: Post
}>()

import slider from "vue3-slider"
let postScale = ref((100+30)/2)
function updatePostscale(value: number) {
    localStorage.setItem('postScale', value.toString())
}

onMounted(async () => {
    const loadedPostScale = numify(localStorage.getItem('postScale'))
    if (loadedPostScale && loadedPostScale >= 30 && loadedPostScale <= 100)
        postScale.value = loadedPostScale
})

</script>

<template>
    <section class="post">
        <slider orientation="vertical" v-model="postScale" color="#4C9BD4" trackColor="#202427" :min="30" @change="updatePostscale"></slider>
        <section class="content-background">
            <img :src="post.url" class="content" :style="{ width: `${postScale}%` }"/>
        </section>
        <p class="text">
            <span class="title">{{ post?.title }}</span>
            <RouterLink :to="`/user/${post.author.id}`" class="author">
                <UserProfilePicture :id="post.author.id" />
                <span>{{ post.author.nickname }}</span>
            </RouterLink>
            <span class="date">{{ post.createdAt.toLocaleDateString() }}</span>
        </p>
        <PostList/>
    </section>
</template> 
  
<style scoped lang="scss">
@import '@/assets/base.scss';
.post {
    margin: 1rem 4rem;
}
.content-background {
    width: 100%;
    background-color: $main;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    max-width: 100%;
    min-width: 30%;
    background-color: gray;
    resize: horizontal;
    overflow: hidden;

    img {
        width: 100%;
        text-align: center;
    }
}

.vue3-slider {
    position: fixed;
    right: 3.5rem;
    top: calc(50vh - 8rem);
    height: 20rem!important;
}

.text {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title, .author {
        margin-bottom: .2rem;
    }

    .title {
        font-size: 1.4rem;
    }

    .author {
        font-size: 1.2rem;
        img {
            height: 1lh;
            vertical-align: middle;
            margin-right: .3rem;
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

* {
    text-align: left;
    overflow: hidden;
    max-height: 2lh;    
    max-width: 100%;
}
}

.posts {
    margin-top: 1rem;
}
</style>
