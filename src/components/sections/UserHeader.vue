<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import type { User } from '@/types/entities';

defineProps<{ user: User, subtitle: string }>()
</script>

<template>
    <header>
        <UserProfilePicture :pfpUrl="user.profilePhotoUrl"></UserProfilePicture>
        <span class="nickname">{{ user.nickname }}</span>
        <small class="username">{{ user.username }}</small>
        <h1>{{ subtitle }}</h1>
    </header>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

header {
    padding: 3rem;
    border-bottom: 5px solid $main;
    display: grid;
    grid-template: auto auto / min-content auto 1fr;
    justify-content: start;
    align-items: center;
    width: 100%;
    gap: .2rem .5rem;

    svg {
        grid-row: 1 / 3;
        width: 4rem;
    }

    .nickname {
        font-size: 1.5rem;
        align-self: end;
    }

    .username {
        align-self: start;
        font-size: 1.2rem;
        color: $text-faded;
    }

    h1 {
        font-size: 2rem;
        grid-row: 1 / 3;
        grid-column: 3;
        justify-self: flex-end;
    }
}

@media screen and (max-width: $mobile-width-large) {
    header {
        flex-direction: column;
        padding: 1rem 0;
    }
}
</style>