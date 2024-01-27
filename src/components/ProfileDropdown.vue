<script setup lang="ts">
import { getUser } from '@/composables/api/auth';
const user = getUser()

const { closed } = defineProps<{ closed: boolean }>()
</script>

<template>
    <ul v-if="user" :class="{ closed }">
        <div class="arrow-up"></div>
        <li>
            <RouterLink to="/">Profile</RouterLink>
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
            <RouterLink to="/">Logout</RouterLink>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

ul {
    $padding: 12px;
    position: absolute;
    top: 5.4rem;
    border-radius: $padding;
    background-color: $main-light;
    width: 140px;
    padding: $padding;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: .5rem;
    box-shadow: 2px 2px 8px black;

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

    a {
        text-align: center;
        display: inline-block;
        padding: .5rem;
        background-color: $background;
        border-radius: .5rem;
        width: 100%;
    }

    .logout {
        width: 100%;

        a {
            background-color: $red;
        }
    }
}

@media screen and (max-width: $mobile-width-large) {
    ul {
        top: 5rem;
        transform: translateX(-5px);
    }
}


.closed {
    display: none;
}
</style>