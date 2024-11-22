<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import colors from 'tailwindcss/colors'
import { theme, type ConfigProviderProps } from 'ant-design-vue'
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
</script>

<template>
  <a-style-provider hash-priority="high">
    <a-config-provider :theme="themeConf">
      <template #renderEmpty>
        <a-typography-title> ¯\_(ツ)_/¯</a-typography-title>
        <i> Nothing here. </i>
      </template>
      <suspense>
        <template #fallback>
          <a-layout>
            <a-layout-header class="dark:!bg-slate-900 !bg-zinc-100 !px-4 lg:!px-20 z-50">
              <a-skeleton :paragraph="false" active />
              <a-skeleton :paragraph="false" active />
            </a-layout-header>
            <a-layout-content class="lg:m-20 m-10">
              <a-skeleton active />
              <a-skeleton active />
              <a-skeleton active />
              <a-skeleton active />
              <a-skeleton active />
            </a-layout-content>
          </a-layout>
        </template>
        <root-layout />
      </suspense>
    </a-config-provider>
  </a-style-provider>
</template>

<style scoped lang="scss"></style>
