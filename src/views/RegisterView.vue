<script setup lang="ts">
import { ref } from 'vue';
import { register } from '@/composables/api/auth'
import router from '@/router';

let username = ref<string>('')
let nickname = ref<string>('')
let email = ref<string>('')
let password = ref<string>('')
let about = ref<string>('')

async function onSubmit() {
    const response = await register({
        username: username.value,
        nickname: nickname.value.trim().length > 0 ? nickname.value : '',
        email: email.value,
        password: password.value,
        about: about.value.length > 0 ? about.value : '',
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
            <span>Welcome to VPad!</span>
        </h1>
        <form method="post" @submit.prevent="onSubmit" autocomplete="off">
            <section class="text-input">
                <label><span class="req">*</span>Username <small>*Must be unique</small></label>
                <input required type="text" v-model="username" minlength="5">
            </section>
            <section class="text-input">
                <label>Nickname</label>
                <input type="text" v-model="nickname">
            </section>
            <section class="text-input">
                <label><span class="req">*</span>Email</label>
                <input required type="email" v-model="email">
            </section>
            <section class="text-input">
                <label><span class="req">*</span>Password</label>
                <input required type="password" v-model="password" minlength="5">
            </section>
            <section class="text-input">
                <label>About</label>
                <textarea type="text" v-model="about"></textarea>
            </section>
            <section class="submit">
                <button type="submit">Register</button>
                <RouterLink to="/login">Login instead</RouterLink>
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

    .req {
        color: $light-red;
    }

    input,
    button,
    textarea {
        font-size: inherit;
        background-color: $main;
        border: 0;
        border-radius: .5rem;
    }

    button {
        padding: .8rem;
    }

    .text-input {
        width: 100%;

        label {
            display: block;
            margin-bottom: 2px;
        }

        input,
        textarea {
            padding: .5rem;
            width: 100%;
        }

        textarea {
            resize: both;
            min-width: 100%;
            min-height: 2lh;
            max-width: 50vw;
            max-height: 20vh;
        }

        a {
            text-align: right;
        }

        small {
            color: $text-faded;
        }
    }

    .submit {
        width: 100%;
        text-align: center;
    }
}
</style>