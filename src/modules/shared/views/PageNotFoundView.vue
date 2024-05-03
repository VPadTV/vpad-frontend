<script setup lang="ts">
import BaseHeaderSidebar from '@modules/shared/components/HeaderSidebar'
import PostList from '@modules/posts/components/PostList.vue'
</script>

<template>
    <BaseHeaderSidebar>
        <h2>Oops! This page doesn't exist</h2>
        <PostList />
    </BaseHeaderSidebar>
</template>

<style scoped lang="scss">
h2 {
    margin: 3rem;
    text-align: center;
}

.posts {
    padding: 4rem 6rem;
}
</style>
