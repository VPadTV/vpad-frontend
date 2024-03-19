<script setup lang="ts">
import type { CloseableComponentProps } from '.'

defineProps<CloseableComponentProps>()
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
