<script setup lang="ts">
import {provide} from "vue";
import { RouterView } from 'vue-router';
import { AuthenticationRepository } from '@infra/repositories/Authentication/auth'
import type { UserGetResponse } from '@infra/repositories/User/user.types'
const maybeCurrentUser = (await AuthenticationRepository.whoami()) ?? null;
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
