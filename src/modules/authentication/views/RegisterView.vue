<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { register } from '@modules/authentication/composables'

const username = ref<string>('')
const nickname = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const about = ref<string>('')

async function onSubmit() {
    const response = await register({
        username: username.value,
        nickname: nickname.value.trim().length > 0 ? nickname.value : '',
        email: email.value,
        password: password.value,
        about: about.value.length > 0 ? about.value : ''
    })
    if (response != null) router.push({ name: 'home' })
}
</script>

<template>
    <h1>Not Implemented</h1>
</template>

<style scoped lang="scss"></style>