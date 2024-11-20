<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { PostGetResponse } from '@infra/repositories/Post/post.types.js'

const props = defineProps<{
  post: PostGetResponse
}>()
</script>

<template>
  <a-card hoverable class="single-feed-post">
    <template #cover>
      <img :src="post.thumbUrl" :alt="post.text" :style="post.meta.nsfw ? 'filter: blur(100px)' : ''" />
    </template>
    <div>
      <a-card-meta>
<!--        <template #avatar>
        </template>-->
        <template #title>
          <div class="flex gap-3">

          <router-link :to="`/post/${post.id}`" class="text-lg font-bold text-link">{{
            post.title
          }}</router-link>
            <a-tag color="red" class="self-center" v-if="post.meta.nsfw">NSFW</a-tag>
          </div>
        </template>
        <template #description>
          <div class="flex items-center gap-2">
            <a-avatar size="small" :src="post.meta.author.profilePhotoUrl" />
            <span class="text-xs">
              <router-link class="text-sm text-link" :to="`/user/${post.meta.author.id}`">
                {{ post.meta.author.nickname }}
              </router-link>
            </span>
          </div>

          <a-divider style="margin: 0.5em 0.5em" />
          <a-flex wrap="wrap" :gap="6">
            <a-tag color="#4c9bd4" v-for="tag in post.meta.tags">
              {{ tag }}
            </a-tag>
          </a-flex>
        </template>
      </a-card-meta>
    </div>
  </a-card>
</template>

<style  lang="scss">
.single-feed-post .ant-card .ant-card-cover {
  overflow: hidden;
}
</style>
