<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import type { User } from '@/types/entities'
import CollapsibleUserList from '../CollapsibleUserList.vue'

let subs: Ref<User[]> = ref([])
let follows: Ref<User[]> = ref([])

onMounted(async () => {
  // subs.value = (await get<User[]>('users'))?.splice(10, 20) ?? []
  // follows.value = (await get<User[]>('users'))?.splice(20, 30) ?? []
})
</script>

<template>
  <aside>
    <CollapsibleUserList title="Subscriptions" class="subs" :users="subs" />
    <CollapsibleUserList title="Follows" class="follow" :users="follows" />
  </aside>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

aside {
  background-color: $main;
  width: $sidebar-width;
  transition: transform $sidebar-transition-time;
  padding: 1rem 1rem 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;

  > div {
    margin-bottom: 1rem;
  }

  * {
    flex-shrink: 0;
  }
}
</style>
