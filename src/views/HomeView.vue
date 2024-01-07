<script setup lang="ts">
import { ref } from 'vue';
import SearchHeader from '../components/SearchHeader.vue'
import SubscriptionSidebar from '../components/SubscriptionSidebar.vue'
import VideoList from '../components/VideoList.vue'

let sidebarClosed = ref(false)
</script>


<template>
    <SearchHeader/>
    <SubscriptionSidebar :class="{ collapsed: sidebarClosed }"/>
    <button class="arrow" :class="{ collapsed: sidebarClosed }" :onClick="() => sidebarClosed = !sidebarClosed">
        <img src="@/assets/arrow.png" alt="">
    </button>
    <div class="scroll">
        <VideoList :class="{ 'aside-margin': !sidebarClosed }"/>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';

header {
    position: fixed;
    z-index: 1;
}

aside {
    position: fixed;
    top: $header-height;
    height: calc(100vh - $header-height);
    z-index: 1;
}

aside.collapsed {
    transform: translateX(-100%);
}

.arrow {
    position: fixed;
    background-color: $main-light;
    border: none;
    border-radius: 100%;
    padding: .5rem;
    top: calc($header-height + 1rem);
    left: calc($sidebar-width + 1rem);
    z-index: 1;

    transition: transform $sidebar-transition-time;

    img {
        width: 1.2rem;
        vertical-align: middle;
    }
    
    :hover {
        cursor: pointer;
    }
}

.arrow.collapsed {
    transform: translateX(-$sidebar-width) rotate(-180deg);
}

.scroll {
    margin-top: $header-height;
    position: relative;
    height: calc(100vh - $header-height);
    overflow: auto;
}

.videos {
    transition: margin-left $sidebar-transition-time;
}

.aside-margin {
    margin-left: $sidebar-width;
}

</style>