<script setup lang="ts">
import type { User } from '@/domain/entities/User';

defineProps<{ user: User; subtitle: string }>()
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
    gap: 0.2rem 0.5rem;

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
        padding: 1rem 0;
        grid-template: auto auto auto / 1fr min-content auto 1fr;
        justify-items: center;

        svg {
            grid-column: 2;
        }

        .nickname {
            grid-column: 3;
        }

        .username {
            grid-column: 3;
            grid-row: 2;
        }

        h1 {
            font-size: 2rem;
            grid-row: 3;
            grid-column: 1 / 6;
            justify-self: center;
        }
    }
}
</style>
