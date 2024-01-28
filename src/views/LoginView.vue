<script setup lang="ts">
import TextInput from '@/components/TextInput.vue'

import { ref } from 'vue';
import { login } from '@/composables/api/auth'
import router from '@/router';

let emailOrUsername = ref<string>('')
let password = ref<string>('')

async function onSubmit() {
    const response = await login({
        emailOrUsername: emailOrUsername.value!,
        password: password.value!,
    })
    if (response != null)
        router.push({ name: 'home' })
}
</script>

<template>
    <main>
        <h1 class="title">
            <RouterLink to="/" class="logo">
                <img alt="VPad" src="@/assets/logo_whitebg.png" />
            </RouterLink>
            <span>Welcome back!</span>
        </h1>
        <form method="post" @submit.prevent="onSubmit" autocomplete="off">
            <TextInput v-model="emailOrUsername">
                Email or username
            </TextInput>
            <TextInput type="password" v-model="password">
                Password
            </TextInput>
            <section class="submit">
                <button type="submit">Login</button>
                <RouterLink to="/register">Register instead</RouterLink>
            </section>
        </form>
    </main>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1lh;
    column-gap: .6rem;

    .logo {
        height: 100%;

        img {
            height: 100%;
        }
    }
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    row-gap: 1rem;
    padding: 1.8em;
    border: 4px solid $main;
    border-radius: 1rem;

    a {
        display: block;
        font-size: .8em;
        color: $link;
    }

    button {
        font-size: inherit;
        background-color: $main;
        border: 0;
        border-radius: .5rem;
        padding: .5rem 1.2rem;
    }

    .submit {
        width: 100%;
        text-align: center;
    }
}
</style>