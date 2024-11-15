<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { login } from '../composables'

const emailOrUsername = ref<string>('')
const password = ref<string>('')

async function onSubmit() {
    const response = await login({
        emailOrUsername: emailOrUsername.value!,
        password: password.value!
    })
    if (response != null) router.push({ name: 'home' })
}
</script>

<template>
    <h1>Not Implemented</h1>
</template>

<style scoped lang="scss"></style>