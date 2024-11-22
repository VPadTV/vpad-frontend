<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import type { MaybeUserSetter } from '@infra/repositories/User/user.types'

const router = useRouter()
const {user} = inject<MaybeUserSetter>("user")
const handleMenuClick: MenuProps['onClick'] = (e) => {
  router.push(e.key)
}
</script>

<template>
  <div v-if="!user" class="flex gap-3 items-center">
    <router-link class="!inline-flex hover:!text-unset" to="/login">
      <a-button>Login</a-button>
    </router-link>
    <router-link class="!inline-flex hover:!text-unset" to="/register">
      <a-button type="primary">Register</a-button>
    </router-link>
  </div>
  <a-dropdown v-else>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="/post/new">
          <div class="flex gap-2 items-center">
            <plus-outlined class="text-lg" />
            <span> Create new post </span>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="/logout">
          <div class="flex gap-2 items-center">
            <logout-outlined class="text-lg" />
            <span>Logout</span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
    <div class="flex gap-4 items-center">
      <a-avatar :src="user.profilePhotoUrl" />
      <span class="font-bold uppercase">{{ user.username }}</span>
    </div>
  </a-dropdown>
</template>

<style scoped lang="scss"></style>
