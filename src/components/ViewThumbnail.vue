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
    <img class="thumbnail" v-lazy="{ src: getThumbnailUrl(post) }"
        :style="{ aspectRatio: (post.meta.width ?? 1) / (post.meta.height ?? 1) }" />
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.thumbnail {
    align-self: center;
    background-color: $main;
    max-width: 100%;
}
</style>