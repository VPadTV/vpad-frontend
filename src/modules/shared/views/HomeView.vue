<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {Grid} from 'ant-design-vue';
import MasonryWall from "@yeger/vue-masonry-wall"
import { PostRepository } from '@infra/repositories/Post/post'
import type { PostGetResponse as Post } from '@infra/repositories/Post/post.types.js'
import SingleFeedPost from '@shared/components/SingleFeedPost/SingleFeedPost.vue'
const {useBreakpoint} = Grid;
const bp = useBreakpoint();
const route = useRoute()
const isDebug = ref(!!import.meta.env.VITE_DEBUG)
const rdata = (await PostRepository.getMany({
  nsfw: !!route.query.nsfw,
  page: parseInt((route.query.page as string) ?? '1'),
  size: 30,
  sortBy: 'latest'
}))
const data = ref<Post[]>(rdata?.data ?? [])
const duped = computed(() => Array(30).fill(0).flatMap(() => data.value).toSorted(() => Math.floor(Math.random() * 2 - 1) > 0 ? 1 : -1))
const cols = computed(() => bp.value.xxxl ? 6 : bp.value.xxl ? 5 : bp.value.xl ? 4 : bp.value.lg ? 3 : bp.value.md ? 3 : bp.value.sm ? 1 : bp.value.xs ? 1 : 1)
</script>
<template>
  <masonry-wall :min-columns="cols" :max-columns="cols" :items="isDebug ? duped : data" :gap="16" :key-mapper="(a) => a.id">
    <template #default="{item}">
      <single-feed-post :post="item" />
    </template>
  </masonry-wall>
  <a-pagination :total="rdata.total" :default-page-size="50"/>
</template>
