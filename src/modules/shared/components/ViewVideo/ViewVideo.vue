<script setup lang="ts">
import type { MediaType } from '@/types/entities'

type MediaPost = { mediaType: MediaType; mediaUrl: string }
const { post } = defineProps<{ post: MediaPost }>()

function getStreamUrl() {
  const spl = post.mediaUrl.split('/')
  return import.meta.env.VITE_API_URL + 'post/stream/' + spl[spl.length - 1]
}
</script>

<template>
  <video class="content" controls="true" :src="getStreamUrl()"></video>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.content {
  align-self: center;
  max-width: 100%;
  background-color: $main;
}
</style>
