<script setup lang="ts">
import {provide} from "vue";
import { RouterView } from 'vue-router';
import type { UserGetResponse } from '@infra/repositories/User/user.types'
import { getUserAuth } from '@modules/authentication/composables'
const maybeCurrentUser = await getUserAuth() ?? null;
provide<UserGetResponse | null>("user", maybeCurrentUser)
</script>

<template>
  <a-layout-content class="lg:m-20 m-10">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <suspense>
          <component :is="Component"></component>
        </suspense>
      </template>
    </RouterView>
  </a-layout-content>
</template>
