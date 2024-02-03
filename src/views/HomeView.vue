<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import PostList from '@/components/sections/PostList.vue'
import { ref } from 'vue';

const filter = ref<{
    page: number,
}>({ page: 1 })

</script>

<template>
    <BaseHeaderSidebar>
        <PostList :filter="filter" />
    </BaseHeaderSidebar>
</template>

<style scoped lang="scss">
main {
    height: 100%;
}

.posts {
    padding: 4rem 6rem 0;

    @media screen and (max-width: 570px) {
        padding: 4rem 3rem 0;
    }
}
</style>