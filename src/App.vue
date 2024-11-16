<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#4c9bd4',
      colorLink: '#7bc8fc',
      colorError: '#d44c4c'
    }
  }">
    <RouterView />

  </a-config-provider>
</template>

<style scoped lang="scss"></style>
