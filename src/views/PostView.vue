<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import SeePost from '@/components/sections/SeePost.vue'
import type { Post } from '@/types/entities';
import { formatDate, formatNumber, numify } from '@/utils';
import { type Ref, ref, onMounted, onBeforeMount, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import PostList from '@/components/sections/PostList.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import slider from 'vue3-slider'
import { getPost } from '@/composables/api/post';

const MIN_SCALE = 10;

let post: Ref<Post | undefined> = ref(undefined)
let postScale = ref((100 + MIN_SCALE) / 2)

function updatePostscale(value: number) {
    localStorage.setItem('postScale', value.toString())
}

onBeforeMount(async () => {
    const loadedPostScale = numify(localStorage.getItem('postScale'))
    if (loadedPostScale && loadedPostScale >= MIN_SCALE && loadedPostScale <= 100)
        postScale.value = loadedPostScale
})

onMounted(async () => {
    const route = ref(useRoute())
    const postRaw = await getPost(route.value.params.postId as string)
    if (postRaw) {
        post.value = ({
            ...postRaw,
            meta: {
                ...postRaw.meta,
                likes: formatNumber(postRaw.meta.likes),
                dislikes: formatNumber(postRaw.meta.dislikes),
                createdAt: formatDate(postRaw.meta.createdAt),
                updatedAt: formatDate(postRaw.meta.updatedAt)
            }
        })
    }
})
</script>


<template>
    <BaseHeaderSidebar>
        <slider width="20rem" :height="12" class="scaling-slider" orientation="vertical" v-model="postScale" color="#4C9BD4"
            trackColor="#202427" :min="MIN_SCALE" @change="updatePostscale"></slider>
        <SeePost v-if="post" :post="post" :postScale="postScale" />
        <div v-else class="notfound">
            <LoadingIcon />
        </div>
        <PostList />
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