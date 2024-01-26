<script setup lang="ts">
import { ref } from 'vue';
import SearchHeader from '@/components/sections/SearchHeader.vue'
import SubscriptionSidebar from '@/components/sections/SubscriptionSidebar.vue'

let sidebarClosed = ref(false)
</script>


<template>
    <SearchHeader/>
    <SubscriptionSidebar :class="{ collapsed: sidebarClosed }"/>
    <button class="arrow" :class="{ collapsed: sidebarClosed }" :onClick="() => sidebarClosed = !sidebarClosed">
        <img src="@/assets/arrow.png" alt="">
    </button>
    <div class="scroll">
        <main :class="{ 'aside-margin': !sidebarClosed }">
            <slot></slot>
        </main>
        
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
    background-color: $main;
    border: none;
    border-radius: 0 0 100% 0;
    padding:   .5rem 1rem 1rem .5rem;
    top: calc($header-height);
    left: calc($sidebar-width);
    z-index: 1;

    transition: transform $sidebar-transition-time;

    img {
        width: 1.2rem;
        vertical-align: middle;
    }
}

.arrow:hover {
    cursor: pointer;
}

.arrow.collapsed {
    transform: translateX(-$sidebar-width);
    img {
        transform: scaleX(-1);
    }
}

.scroll {
    margin-top: $header-height;
    position: relative;
    height: calc(100vh - $header-height);
    overflow: auto;

    > main {
        transition: margin-left $sidebar-transition-time;
    }
}

.aside-margin {
    margin-left: $sidebar-width;
}

</style>