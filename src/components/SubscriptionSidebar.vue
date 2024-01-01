<script setup lang="ts">
import { ref } from 'vue';

const sidebarClosed = ref(true)
</script>

<template>
    <aside :class="{ collapsed: sidebarClosed }">
        <h2>Subscriptions</h2>
        <section></section>
        <h2>Follows</h2>
        <section></section>
    </aside>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';
aside {
    position: fixed;
    background-color: $main;
    height: 100%;
    min-width: 15vw;
    transition: transform .2s;
    padding: 0 1rem 0 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center; 
    }
}

aside.collapsed {
    transform: translate(-100%);
}
</style>
