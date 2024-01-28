<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import SearchHeader from '@/components/sections/SearchHeader.vue'
import SubscriptionSidebar from '@/components/sections/SubscriptionSidebar.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import { boolify } from '@/utils';

const sidebarClosed = ref(false)

function toggleClosed() {
    sidebarClosed.value = !sidebarClosed.value;
    localStorage.setItem('sidebarClosed', sidebarClosed.value.toString());
}

onBeforeMount(async () => {
    const loadedClosed = boolify(localStorage.getItem('sidebarClosed'));
    if (loadedClosed != null)
        sidebarClosed.value = loadedClosed;
})
</script>


<template>
    <SubscriptionSidebar :class="{ closed: sidebarClosed }" />
    <button class="arrow" :class="{ closed: sidebarClosed }" :onClick="toggleClosed">
        <ArrowIcon class="arrow-icon" />
    </button>
    <SearchHeader />
    <div class="scroll">
        <main :class="{ 'aside-margin': !sidebarClosed }">
            <slot></slot>
        </main>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

header {
    position: fixed;
    top: 0;
    z-index: 1;
}

aside {
    position: fixed;
    top: $header-height;
    height: calc(100vh - $header-height);
    z-index: 1;
}

aside.closed {
    transform: translateX(-100%);
}

.arrow {
    position: fixed;
    background-color: $main;
    border: none;
    border-radius: 0 0 100% 0;
    padding: .5rem 1rem 1rem .5rem;
    top: calc($header-height);
    left: calc($sidebar-width);
    z-index: 1;

    transition: transform $sidebar-transition-time;

    .arrow-icon {
        width: 1.2rem;
        vertical-align: middle;
    }
}

.arrow:hover {
    cursor: pointer;
    filter: none;

    svg {
        filter: opacity(80%)
    }
}

.arrow.closed {
    transform: translateX(-$sidebar-width);

    .arrow-icon {
        transform: scaleX(-1);
    }
}

.scroll {
    position: relative;
    top: $header-height;
    height: calc(100vh - $header-height);
    overflow: auto;

    >main {
        transition: margin-left $sidebar-transition-time;
    }
}

.aside-margin {
    margin-left: $sidebar-width;
}

@media screen and (max-width: $mobile-width-large) {
    aside {
        width: 100%;
        padding: 1rem 2.4rem;
        top: $header-height-width-large;
        height: calc(100vh - $header-height-width-large);
    }

    .arrow {
        position: fixed;
        background-color: transparent;
        border-radius: 0 100% 100% 0;
        top: calc(50vh);
        scale: 1.5;
        padding: 0;
        left: .5rem;
        transition: none;
    }

    .arrow.closed {
        transform: none;

        .arrow-icon {
            transform: scaleX(-1);
        }
    }

    .scroll {
        top: $header-height-width-large;
        height: calc(100vh - $header-height-width-large);
    }
}
</style>