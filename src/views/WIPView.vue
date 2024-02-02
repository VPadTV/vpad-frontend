<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
</script>


<template>
    <BaseHeaderSidebar>
        <section>
            <h1>Under construction...</h1>
            <RouterLink to="/">Click here to go back</RouterLink>
        </section>
    </BaseHeaderSidebar>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

section {
    margin-top: 5lh;
    width: 100%;
    vertical-align: middle;
    text-align: center;

    font-size: 1.5rem;

    a {
        color: $link;
    }
}
</style>