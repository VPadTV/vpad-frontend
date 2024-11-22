<script setup lang="ts">

  import { inject, type Ref } from 'vue'
  import { logout } from '@modules/authentication/composables'
  import {useRouter} from "vue-router"
  import type { MaybeUserSetter } from '@infra/repositories/User/user.types'
  const u = inject<MaybeUserSetter>("user")
  const router = useRouter()
  logout()
  u.set(null);
  router.replace("/")
</script>

<template>
  <a-typography-title :level="4" class="font-italic">
    Logging out...
  </a-typography-title>
</template>

<style scoped lang="scss">

</style>
