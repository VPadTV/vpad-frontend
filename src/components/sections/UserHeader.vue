<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import type { User } from '@/types/entities';

const { user } = defineProps<{ user: User }>()
</script>

<template>
    <header>
        <div class="identity">
            <UserProfilePicture :pfpUrl="user.profilePhotoUrl"></UserProfilePicture>
            <h1>
                <span>{{ user.nickname }}</span>
                <small>{{ user.username }}</small>
            </h1>
        </div>
        <slot></slot>
    </header>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

header {
    padding: 3rem;
    border-bottom: 5px solid $main;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 2.5rem;
    }

    .identity {
        display: inline-flex;
        align-items: center;
        column-gap: .6rem;
        height: 4.5rem;

        svg {
            width: unset;
        }

        h1 {
            font-size: 2rem;

            small {
                display: block;
                font-size: 1.2rem;
                color: $text-faded;
            }
        }
    }
}

@media screen and (max-width: $mobile-width-large) {
    header {
        flex-direction: column;
        padding: 1rem 0;
    }
}
</style>