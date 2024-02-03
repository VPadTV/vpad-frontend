<script setup lang="ts">
type MediaPost = { mediaType: 'IMAGE' | 'VIDEO', thumbUrl?: string, mediaUrl: string, meta: { width?: number, height?: number } }
const { post } = defineProps<{ post: MediaPost }>()

function getThumbnailUrl(post: MediaPost): string {
    if (post.mediaType === 'IMAGE') {
        return post.thumbUrl ?? post.mediaUrl
    }
    return post.thumbUrl ?? ""
}

</script>

<template>
    <img class="thumbnail" v-lazy="{ src: getThumbnailUrl(post) }" :width="post.meta.width" :height="post.meta.height" />
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.thumbnail {
    align-self: center;
    max-width: 100%;
    background-color: $main;
}
</style>