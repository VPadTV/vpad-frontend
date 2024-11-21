<script setup lang="ts">
import { reactive, ref, watch, provide } from 'vue'
import colors from 'tailwindcss/colors'
import { theme, type ConfigProviderProps } from 'ant-design-vue'
import logo from '@assets/images/logonew.webp'
import Sidebar from '@modules/shared/components/Sidebar/index.vue'
import RootLayout from '@shared/components/RootLayout/RootLayout.vue'

const mq = window.matchMedia('(prefers-color-scheme: dark)')
const mqRef = ref<boolean>(mq.matches)
mq.addEventListener('change', (e) => (mqRef.value = e.matches))
const bg = (v: boolean) => (v ? colors.slate['950'] : colors.zinc['50'])
const themeConf = reactive<NonNullable<ConfigProviderProps['theme']>>({
  token: {
    colorPrimary: '#4c9bd4',
    colorLink: '#7bc8fc',
    colorError: '#d44c4c',
    colorLinkHover: '#4795cb',
    colorBgBase: bg(mqRef.value)
  },
  algorithm: mqRef.value ? theme.darkAlgorithm : theme.defaultAlgorithm
})
watch(mqRef, (nv) => {
  themeConf.algorithm = nv ? theme.darkAlgorithm : theme.defaultAlgorithm
  themeConf.token!.colorBgBase = bg(nv)
})
const sidebarCollapsed = ref<boolean>(true)
provide('sidebarCollapsed', sidebarCollapsed)
</script>

<template>
  <a-style-provider hash-priority="high">
    <a-config-provider :theme="themeConf">
      <template #renderEmpty>
        <a-typography-title> ¯\_(ツ)_/¯</a-typography-title>
        <i> Nothing here. </i>
      </template>
      <a-layout class="">
        <a-layout-header
          class="dark:!bg-slate-900 !bg-zinc-100 !px-4 lg:!px-20 z-50 flex gap-6 h-inherit items-center"
        >
          <span class="text-2xl opacity-50">
            <menu-unfold-outlined
              v-if="sidebarCollapsed"
              @click="() => (sidebarCollapsed = !sidebarCollapsed)"
            />
            <menu-fold-outlined v-else @click="() => (sidebarCollapsed = !sidebarCollapsed)" />
          </span>
          <div class="h-inherit py-3 grow flex justify-between">
            <div class="h-full flex gap-3">
              <img alt="VPad logo" class="brand shrink h-full" :src="logo" />
              <a-typography-title class="!m-0" :level="2"> VPad</a-typography-title>
            </div>
          </div>
        </a-layout-header>
        <a-layout has-sider>
          <sidebar class="shrink basis-sidebar mt-16 lg:mt-0 md:!flex" />
          <Suspense>
            <root-layout />
          </Suspense>
        </a-layout>
      </a-layout>
    </a-config-provider>
  </a-style-provider>
</template>

<style scoped lang="scss"></style>
