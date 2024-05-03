<script setup lang="ts">
defineProps<{
    closed: boolean
}>()
</script>

<template>
    <div class="closeable" :class="{ closed }">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.closed {
    display: none;
}
</style>
