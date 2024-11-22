<script setup lang="ts">
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'
import logo from '@assets/images/logonew.webp'
import type { MaybeUserSetter } from '@infra/repositories/User/user.types'
import { getUserAuth } from '@modules/authentication/composables'
import NavDropdown from '@shared/components/NavDropdown/NavDropdown.vue'
import Sidebar from '@shared/components/Sidebar/index.vue'

const user = ref((await getUserAuth()) ?? null)
provide<MaybeUserSetter>('user', {
  user,
  set(nv) {
    user.value = nv
  }
})
const sidebarCollapsed = ref<boolean>(true)
provide('sidebarCollapsed', sidebarCollapsed)
</script>

<template>
  <a-layout>
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
        <router-link to="/" class="h-full flex gap-3">
          <img alt="VPad logo" class="brand shrink h-full" :src="logo" />
          <a-typography-title class="!m-0" :level="2"> VPad</a-typography-title>
        </router-link>
        <suspense>
          <template #fallback>
            <div class="flex gap-4">
              <a-avatar />
              <a-skeleton :paragraph="false" />
            </div>
          </template>
          <nav-dropdown />
        </suspense>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout has-sider>
        <sidebar class="shrink basis-sidebar mt-16 lg:mt-0 md:!flex" />
        <a-layout-content class="m-5 lg:m-10">
          <RouterView v-slot="{ Component }">
            <template v-if="Component">
              <suspense>
                <template #fallback>
                  <div>
                    <a-skeleton active />
                    <a-skeleton active />
                    <a-skeleton active />
                    <a-skeleton active />
                  </div>
                </template>
                <component :is="Component"></component>
              </suspense>
            </template>
          </RouterView>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
