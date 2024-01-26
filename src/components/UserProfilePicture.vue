<script setup lang="ts">
const { id } = defineProps<{
    id: string
}>()

</script>

<template>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" />
    </svg>
</template>

<style scoped lang="scss">
svg {
    display: inline-block;
    height: 100%;
    width: 100%;
    * {
        color: white;
        fill: white;
    }
}
</style>