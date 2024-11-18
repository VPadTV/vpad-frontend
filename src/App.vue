<script setup lang="ts">
import { RouterView } from 'vue-router'
import { theme } from 'ant-design-vue'
import logo from "@assets/images/logonew.webp"
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#4c9bd4',
        colorLink: '#7bc8fc',
        colorError: '#d44c4c'
      },
      algorithm:
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm
    }"
  >
    <template #renderEmpty>
      <a-typography-title> ¯\_(ツ)_/¯</a-typography-title>
      <i> Nothing here. </i>
    </template>
   <main class="flex flex-col">
     <a-layout>
       <a-layout-header >
         <div class="flex h-inherit py-3 gap-4">
           <img alt="VPad logo" class="brand shrink object-contain h-inherit" :src="logo"/>
           <a-typography-title :level="2">
            VPad
           </a-typography-title>
         </div>
       </a-layout-header>
       <a-layout>
         <a-layout-content class="p-6">
           <RouterView v-slot="{ Component }">
             <template v-if="Component">
               <Suspense>
                 <component :is="Component"></component>
               </Suspense>
             </template>
           </RouterView>
         </a-layout-content>
       </a-layout>
     </a-layout>
   </main>
  </a-config-provider>
</template>

<style scoped lang="scss"></style>
