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
    <main>
        <SearchHeader/>
        <section>
            <SubscriptionSidebar :sidebarClosed="sidebarClosed"/>
            <VideoList :class="videoSidebarMargin"/>
        </section>
    </main>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';

aside {
    position: absolute;
    height: 100%;
    z-index: 1;
    scroll-behavior: auto;
}

section.videos {
    transition: margin-left .2s;
}

.aside-margin {
    margin-left: $sidebar-width;
}

</style>