<script setup lang="ts">
import { logout } from '@/composables/api/auth';
import router from '@/router';
import { ref } from 'vue';
const { userId, closed } = defineProps<{ userId: string, closed: boolean }>()
const refreshToggle = ref(0);

async function clickLogout() {
    logout()
    router.go(0)
}

</script>

<template>
    <ul v-if="userId" :class="{ closed }" :key="refreshToggle">
        <div class="arrow-up"></div>
        <li>
            <RouterLink :to='`/user/${userId}`'>Profile</RouterLink>
        </li>
        <li>
            <RouterLink to="/dashboard">Dashboard</RouterLink>
        </li>
        <li>
            <RouterLink to="/">Settings</RouterLink>
        </li>
        <li>
            <RouterLink to="/">Help</RouterLink>
        </li>
        <li>
            <RouterLink to="/">Report</RouterLink>
        </li>
        <li class="logout">
            <button @click="clickLogout">Logout</button>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

ul {
    $width: 140px;
    $padding: 12px;
    position: absolute;
    transform: translateX(-95px) translateY(10px);
    border-radius: $padding;
    background-color: $main-light;
    width: $width;
    padding: $padding;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: .5rem;
    box-shadow: 2px 2px 8px black;

    font-size: 1rem;

    .arrow-up {
        $size: 10px;
        position: absolute;
        align-self: flex-end;
        transform: translateY(calc(-10px - $padding)) translateX(calc(-13px + $padding));
        width: 0;
        height: 0;
        border-left: $size solid transparent;
        border-right: $size solid transparent;

        border-bottom: $size solid $main-light;
    }

    li {
        list-style-type: none;
        width: 100%;
    }

    a,
    button {
        text-align: center;
        display: inline-block;
        padding: .5rem;
        background-color: $background;
        border: none;
        border-radius: .5rem;
        width: 100%;
    }

    .logout {
        width: 100%;
        font-size: inherit;

        button {
            font-size: inherit;
            background-color: $red;
        }
    }
}

@media screen and (max-width: $mobile-width-large) {
    ul {
        transform: translateX(-85px) translateY(10px);
    }
}


.closed {
    display: none;
}
</style>