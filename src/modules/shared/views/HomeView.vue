<script setup lang="ts">
//
import { PostRepository } from "@infra/repositories/Post/post";
import { useRoute } from 'vue-router'
import type { Post } from '@infra/repositories/Post/post.types.js'
const route = useRoute()

const {data} = (await PostRepository.getMany({
  nsfw: false,
  page: parseInt((route.query.page as string) ?? "1"),
  size: 50,
  sortBy: 'latest'
}))!
</script>
<template>
  <a-list :grid="{gutter: 8, sm: 1, md: 4, lg: 5, xl: 6, xxl: 8}" :data-source="data as Post[]">
    <template #renderItem="{item}">
      <a-list-item>
       <a-card>
         <template #cover>
           <img :src="item.thumbUrl" :alt="item.text"/>
         </template>
       </a-card>
      </a-list-item>
    </template>
  </a-list>
  <h1>Not Implemented</h1>
</template>
