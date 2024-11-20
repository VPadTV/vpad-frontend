<script setup lang="ts">
  import { Grid } from 'ant-design-vue'
  import { ref, watch, inject, type Ref} from 'vue'

  const sidebarCollapsed = inject<Ref<boolean>>("sidebarCollapsed")!
  const { useBreakpoint } = Grid
  const breakpointRef = useBreakpoint()
  const isMobile = ref<boolean>(!!breakpointRef.value.lg)
  watch(useBreakpoint(), (nv) => {
    console.log('bp changed', nv)
    sidebarCollapsed.value = true
    isMobile.value =
      ['xs', 'sm', 'md'].some((a) => !!nv[a as keyof typeof nv]) &&
      !['lg', 'xl', 'xxl', 'xxxl'].some((a) => !!nv[a as keyof typeof nv])
    console.log('horiz', isMobile.value)
  })
</script>

<template>
<!--  <teleport :to="isMobile ? '' : '#desktop-sidebar-slot'">-->

  <a-layout-sider
    collapsible
    :trigger="null"
    v-model:collapsed="sidebarCollapsed"
    breakpoint="lg"
    :collapsed-width="0"
    :class="'!fixed lg:!sticky h-screen mt-16 lg:mt-0 z-50 top-0 left-0 bottom-0 ' + $attrs.class"
  >
  </a-layout-sider>
</template>

<style scoped lang="scss">

</style>
