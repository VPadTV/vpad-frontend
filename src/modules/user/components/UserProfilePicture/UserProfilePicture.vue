<script setup lang="ts">
import type { MediaType } from '@/infrastructure/constants/MediaType';


const { post } = defineProps<{
    post: {
        readonly mediaType: MediaType
        readonly mediaUrl: string
    }
}>()
</script>

<template>
    <img class="content" v-lazy="{ src: post.mediaUrl }" />
</template>

<style scoped lang="scss">
@import '@assets/style/base.scss';

.content {
    align-self: center;
    max-width: 100%;
    background-color: $main;
}
</style>
