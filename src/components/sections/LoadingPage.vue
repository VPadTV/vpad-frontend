<script setup lang="ts">
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
</script>

<template>
    <div class="loading">
        <LoadingIcon></LoadingIcon>
    </div>
</template>

<style scoped lang="scss">
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%;
    padding: 2rem;
}
</style>
