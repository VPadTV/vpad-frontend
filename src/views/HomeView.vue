<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import PostList from '@/components/sections/PostList.vue'

</script>


<template>
    <BaseHeaderSidebar>
        <PostList/>
    </BaseHeaderSidebar>
</template>

<style scoped lang="scss">
.posts {
    padding: 4rem 6rem 0;
    @media screen and (max-width: 570px) {
        padding: 4rem 3rem 0;
    }
}
</style>