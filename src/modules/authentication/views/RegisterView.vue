<script setup lang="ts">
import { reactive } from 'vue'
import router from '@/router'
import { register } from '@modules/authentication/composables'

const formState = reactive<{
  username: string
  nickname: string
  email: string
  password: string
  about: string
}>({
  username: '',
  nickname: "",
  email: "",
  password: "",
  about: ""
})
function requiredRule(field: string) {
  const split = field.trim().split("");
  split[0] = split[0].toLocaleUpperCase();
  return [{required: true, message: `${split.join("")} is required.`}]
}

async function onSubmit() {
  const response = await register(formState)
  if (response != null) router.push({ name: 'home' })
}
</script>

<template>
  <a-form :model="formState" @submit="onSubmit">
    <a-form-item label="Username" name="username"
     :rules="requiredRule('username')"
    >
      <a-input v-model:value="formState.username"/>
    </a-form-item>
    <a-form-item label="Nickname" name="nickname">
      <a-input v-model:value="formState.nickname"/>
    </a-form-item>
    <a-form-item label="Email" name="email" :rules="requiredRule('email')">
      <a-input type="email" v-model:value="formState.email"/>
    </a-form-item>
    <a-form-item label="Password" name="password" :rules="requiredRule('password')">
      <a-input-password v-model:value="formState.password"/>
    </a-form-item>
      <a-form-item label="About you!" name="about">
        <a-textarea v-model:value="formState.about"/>
      </a-form-item>
    <a-button type="primary" html-type="submit">Register</a-button>
  </a-form>
</template>

<style scoped lang="scss"></style>
