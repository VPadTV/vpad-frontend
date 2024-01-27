<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import SeePost from '@/components/sections/SeePost.vue'
import type { Post } from '@/types/entities';
import { formatNumber, numify } from '@/utils';
import { get } from '@/composables/api/base'
import { type Ref, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostList from '@/components/sections/PostList.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import slider from 'vue3-slider'

let post: Ref<Post | undefined> = ref(undefined)
let postScale = ref((100+30)/2)

function updatePostscale(value: number) {
    localStorage.setItem('postScale', value.toString())
}

onMounted(async () => {
    const loadedPostScale = numify(localStorage.getItem('postScale'))
    if (loadedPostScale && loadedPostScale >= 30 && loadedPostScale <= 100)
        postScale.value = loadedPostScale
})

onMounted(async () => {
    const route = ref(useRoute())
    const postRaw = await get<Post>('post', {
        id: route.value.params.postId as string
    })
    if (postRaw) {
        post.value = ({
            ...postRaw,
            likes: formatNumber(postRaw.likes),
            dislikes: formatNumber(postRaw.dislikes),
        })
    }
})
</script>


<template>
    <BaseHeaderSidebar>
        <slider width="20rem" height="12" class="scaling-slider" orientation="vertical" v-model="postScale" color="#4C9BD4" trackColor="#202427" :min="30" @change="updatePostscale"></slider>
        <SeePost v-if="post" :post="post" :postScale="postScale"/>
        <div v-else class="notfound">
            <LoadingIcon/>
        </div>
        <PostList/>
    </BaseHeaderSidebar>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.post {
    margin: 1rem 4rem;
}

.scaling-slider {
    position: fixed;
    right: 1.5rem;
    top: calc(50vh - 8rem);
}

.notfound {
    margin: 2rem 4rem;
    width: 100%;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.posts {
    margin: 1rem 4rem;
}

@media screen and (max-width: $mobile-width-large) {
    .post {
        margin: 0rem;
    }

    .scaling-slider {
        display: none;
    }
}

</style>