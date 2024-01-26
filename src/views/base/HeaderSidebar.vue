<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SearchHeader from '@/components/sections/SearchHeader.vue'
import SubscriptionSidebar from '@/components/sections/SubscriptionSidebar.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import { boolify } from '@/utils';

const closed = ref(false)

function toggleClosed() {
    closed.value = !closed.value;
    localStorage.setItem('sidebarClosed', closed.value.toString());
}

onMounted(async () => {
    const loadedClosed = boolify(localStorage.getItem('sidebarClosed'));
    if (loadedClosed != null)
        closed.value = loadedClosed;
})
</script>


<template>
    <SubscriptionSidebar :class="{ closed }"/>
    <button class="arrow" :class="{ closed }" :onClick="toggleClosed">
        <ArrowIcon class="arrow-icon" :class="{ closed }"/>
    </button>
    <SearchHeader/>
    <div class="scroll">
        <main :class="{ 'aside-margin': !closed }">
            <slot></slot>
        </main>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';

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
}

.arrow.closed {
    transform: translateX(-$sidebar-width);
    .arrow-icon {
        transform: scaleX(-1);
    }
}

.scroll {
    position: relative;
    margin-top: $header-height;
    height: calc(100vh - $header-height);
    overflow: auto;

    > main {
        transition: margin-left $sidebar-transition-time;
    }
}

.aside-margin {
    margin-left: $sidebar-width;
}

@media screen and (max-width: $mobile-width) {
    aside {
        width: 100%;
        padding: 1rem 2.4rem;
    }
    .arrow {
        position: fixed;
        background-color: transparent;
        border-radius: 0 100% 100% 0;
        top: calc(50vh);
        scale: 1.5;
        padding: 0;
        left: .5rem;
    }

    .arrow.closed {
        transform: none;
        .arrow-icon {
            transform: scaleX(-1);
        }
    }
}

</style>