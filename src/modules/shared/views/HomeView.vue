<script setup lang="ts">
//
import { PostRepository } from '@infra/repositories/Post/post'
import { useRoute, RouterLink } from 'vue-router'
import type { Post } from '@infra/repositories/Post/post.types.js'
import SingleFeedPost from '@shared/components/SingleFeedPost/SingleFeedPost.vue'

const route = useRoute()

const { data } = (await PostRepository.getMany({
  nsfw: !!route.query.nsfw,
  page: parseInt((route.query.page as string) ?? '1'),
  size: 50,
  sortBy: 'latest'
}))!
</script>
<template>
  <a-list :grid="{ gutter: 10, sm: 1, md: 3, lg: 4, xl: 6, xxl: 8 }" :data-source="data as Post[]">
    <template #renderItem="{ item }">
      <a-list-item style="padding: 0">
        <single-feed-post :post="item" />
      </a-list-item>
    </template>
  </a-list>
</template>
