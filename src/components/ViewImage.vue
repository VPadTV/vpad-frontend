<script setup lang="ts">
type MediaPost = { mediaType: 'IMAGE' | 'VIDEO', mediaUrl: string }
const { post } = defineProps<{ post: MediaPost }>()
</script>

<template>
    <img class="content" v-lazy="{ src: post.mediaUrl }" />
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.content {
    align-self: center;
    max-width: 100%;
    background-color: $main;
}
</style>