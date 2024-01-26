<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import SeePost from '@/components/sections/SeePost.vue'
import type { Post } from '@/types/entities';
import { formatNumber } from '@/utils';
import { get } from '@/composables/api/base'
import { type Ref, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostList from '@/components/sections/PostList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

let post: Ref<Post | undefined> = ref(undefined)

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
        <SeePost v-if="post" :post="post"/>
        <div v-else class="notfound">
            <LoadingSpinner/>
        </div>
        <PostList/>
    </BaseHeaderSidebar>
</template>

<style scoped lang="scss">
.notfound {
    margin: 2rem 4rem;
    width: 100%;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.posts {
    margin-top: 1rem;
    margin: 0 4rem;
}
</style>