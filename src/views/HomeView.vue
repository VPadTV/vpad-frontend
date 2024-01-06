<script setup lang="ts">
import { computed, ref } from 'vue';
import SearchHeader from '../components/SearchHeader.vue'
import SubscriptionSidebar from '../components/SubscriptionSidebar.vue'
import VideoList from '../components/VideoList.vue'

let sidebarClosed = ref(false)

const videoSidebarMargin = computed(() => ({
    'aside-margin': !sidebarClosed.value
}))
</script>


<template>
    <SearchHeader/>
    <SubscriptionSidebar :sidebarClosed="sidebarClosed"/>
    <VideoList :class="videoSidebarMargin"/>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';

header {
    top: 0;
    position: fixed;
    z-index: 1;
}

aside {
    position: fixed;
    left: 0;
    top: $header-height;
    height: 100%;
    z-index: 1;
}

section.videos {
    margin-top: $header-height;
    transition: margin-left $sidebar-transition-time;
}

.aside-margin {
    margin-left: $sidebar-width;
}

</style>