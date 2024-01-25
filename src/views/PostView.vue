<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import SeePost from '@/components/sections/SeePost.vue'
import type { Post } from '@/types/entities';
import { formatNumber } from '@/utils';
import { get } from '@/composables/api/base'
import { type Ref, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

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
        <div v-else>Sadge</div>
    </BaseHeaderSidebar>
</template>

<style lang="scss">
</style>