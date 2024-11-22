<script setup lang="ts">
import { inject, type Ref, ref } from 'vue'
import router from '@/router'
import { getUserAuth, login } from '../composables'
import type { MaybeUser, MaybeUserSetter } from '@infra/repositories/User/user.types'

const emailOrUsername = ref<string>('')
const password = ref<string>('')
const u = inject<MaybeUserSetter>("user")
async function onSubmit() {
    const response = await login({
        emailOrUsername: emailOrUsername.value!,
        password: password.value!
    })
    u.set(await getUserAuth())
    if (response) router.push({ name: 'home' })
}
</script>

<template>
  <a-form @submit="onSubmit" layout="vertical">

    <a-form-item label="Email or username">
      <a-input v-model:value="emailOrUsername"/>
    </a-form-item>
    <a-form-item label="Password">
      <a-input-password v-model:value="password"/>
    </a-form-item>
    <a-button html-type="submit" type="primary">Log In</a-button>
  </a-form>
</template>
